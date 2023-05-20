import React, {useCallback, useEffect, useState} from 'react';
import {Image, Dimensions, Alert, Linking, Button} from 'react-native';

import {useSelector, useDispatch} from 'react-redux';
import {getReview} from '../../../store/slices/reviewSlice';

import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components';
import HeaderBar from '../../../components/Global/HeaderBar';
import Icons from '../../../aseets/Global/Icons';

import ReviewCard from '../../../components/NormalUser/Hospital/ReviewCard';

const {height} = Dimensions.get('window');

const HospitalDetailScreen = props => {
  const selectedHospital = props.route.params.selectedHospital; //HospitalListScreen에서 전달 받은 병원정보
  const reviewArr = useSelector(state => state.review.reviewArr); //병원에 등록되어있는 리뷰 state
  const reviewRegisted = useSelector(state => state.review.isReviewRegistered); //리뷰등록 후 병원상세화면에서 리뷰 업데이트를 위한 state
  const userClass = useSelector(state => state.auth.userClass); //게스트로그인 시 리뷰 기능을 제공하지 않기 위한 class state
  //바텀탭 높이 _ 스크롤뷰
  const bottomTabHeight = useBottomTabBarHeight();
  const dispatch = useDispatch();
  const [reviewCount, setReviewCount] = useState(0); //병원의 리뷰 개수
  const [isReviewUpdate, setIsReviewUpdate] = useState(false); //리뷰 업데이트 state변수

  // 게스트 사용자에게 로그인 안내 알림창. 후기는 로그인 시에만 가능한 기능.
  const showLoginScreen = useCallback(() => {
    Alert.alert('안내', '로그인이 필요한 서비스입니다', [
      {
        text: '확인',
        onPress: () => props.navigation.navigate('auth'),
      },
    ]);
  }, [showLoginScreen]);

  //HospitalDetailScreen 최초 진입 시 리뷰조회
  useEffect(() => {
    const getReviewHandler = async () => {
      try {
        await dispatch(getReview(selectedHospital.name)).unwrap();
      } catch (error) {
        console.log(error);
      }
    };
    getReviewHandler();
  }, [dispatch, selectedHospital]);

  //정상적으로 리뷰 조회 시 리뷰 개수 set
  useEffect(() => {
    if (reviewArr !== null) {
      setReviewCount(reviewArr.length);
    }
  }, [reviewArr]);

  //리뷰 등록 후 reviewRegisted의 상태 변화를 통해 리뷰업데이트
  useEffect(() => {
    setIsReviewUpdate(reviewRegisted);
    if (isReviewUpdate) {
      const updateReviewHandler = async () => {
        try {
          await dispatch(getReview(selectedHospital.name)).unwrap(); // 리뷰 정보를 다시 불러옴
        } catch (error) {
          console.log(error);
        }
      };
      updateReviewHandler();
    }
  }, [reviewRegisted, isReviewUpdate, dispatch, selectedHospital]);

  return (
    <Container>
      <HeaderBar.leftCenter
        leadingAction={() => {
          props.navigation.goBack();
        }}
        leadingIcon={<Icons.arrowBack />}
        centerTitle={selectedHospital.name}
      />
      <ScrollView>
        <Hospitalwrapper>
          <HospitalTitle>{selectedHospital.name}</HospitalTitle>
          <HospitalAddress>{selectedHospital.address}</HospitalAddress>
          <HospitalDepartment>
            진료과목 - {selectedHospital.department}
          </HospitalDepartment>
          <ImageButtonWrapper
            onPress={() => {
              Linking.openURL(`https://&{selectedHospital.domain}`);
            }}>
            <Image
              //source={{uri: selectedHospital.image}}
              source={require('../../../aseets/Hospital/testHospitalImage.png')}
              style={{width: '100%', height: '100%', resizeMode: 'cover'}}
            />
          </ImageButtonWrapper>
        </Hospitalwrapper>

        <DivisionLine />
        <ReviewWrapper bottomTabHeight={bottomTabHeight}>
          <ReviewTitle>리뷰 {reviewCount}</ReviewTitle>
          {reviewArr &&
            reviewArr.map(data => {
              return (
                <ReviewCard
                  key={data.hrId}
                  enableSwiping={false}
                  starSize={RFValue(20)}
                  rating={data.hrRate}
                  onPressStar={() => {
                    console.log(data);
                  }}
                  hiddenUserId={
                    data.userId.slice(0, 2) +
                    data.userId.slice(2).replace(/./g, '*')
                  }
                  reviewComment={data.hrComment}
                />
              );
            })}
          <ReviewButton
            activceOpacity={0.5}
            onPress={() => {
              {
                userClass === 'guest'
                  ? showLoginScreen()
                  : props.navigation.navigate('reviewRegist', {
                      selectedHospital: selectedHospital,
                    });
              }
            }}>
            <ReviewButtonText>리뷰 쓰기 </ReviewButtonText>
          </ReviewButton>
        </ReviewWrapper>
      </ScrollView>
    </Container>
  );
};

const Container = styled.SafeAreaView`
  background-color: ${props => props.theme.colors.white};
`;
const Hospitalwrapper = styled.View`
  padding: 20px;
`;
const ScrollView = styled.ScrollView``;

const HospitalTitle = styled.Text`
  margin-top: ${height / 20}px;
  font-size: ${RFValue(20)}px;
  font-weight: bold;
  color: ${props => props.theme.colors.patientColor};
`;
const HospitalAddress = styled.Text`
  margin-top: ${height / 40}px;
  font-size: ${RFValue(14)}px;
  color: ${props => props.theme.colors.black};
`;
const HospitalDepartment = styled.Text`
  margin-top: 5px;
  font-size: ${RFValue(12)}px;
  color: ${props => props.theme.colors.gray2};
`;
const ImageButtonWrapper = styled.TouchableOpacity`
  margin-top: ${height / 30}px;
  border-radius: 15px;
  height: ${height / 4}px;
  overflow: hidden;
`;
const DivisionLine = styled.View`
  width: 100%;
  height: 10px;
  margin-top: ${height / 30}px;
  background-color: ${props => props.theme.colors.gray6};
`;
const ReviewWrapper = styled.View`
  margin-top: ${height / 40}px;
  margin-bottom: ${props => props.bottomTabHeight}px;
  padding: 20px;
`;
const ReviewTitle = styled.Text`
  font-size: ${RFValue(18)}px;
  justify-content: center;
  font-weight: bold;
  color: ${props => props.theme.colors.black};
`;
const ReviewButton = styled.TouchableOpacity`
  margin-top: 20px;
  align-self: center;
  align-items: center;
  padding: 10px;
  width: 100%;
  border: 2px;
  border-radius: 10px;
  border-color: ${props => props.theme.colors.patientColor};
`;
const ReviewButtonText = styled.Text`
  margin-vertical: 5px;
  font-weight: 600;
  font-size: ${RFValue(13)}px;
  color: ${props => props.theme.colors.black};
`;

export default HospitalDetailScreen;
