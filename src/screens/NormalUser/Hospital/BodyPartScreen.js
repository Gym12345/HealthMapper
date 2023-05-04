import React, {useState, useEffect, useCallback} from 'react';
import {
  Dimensions,
  Linking,
  Alert,
  View,
  ActivityIndicator,
} from 'react-native';

import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';

import Geolocation from '@react-native-community/geolocation';
import {RFValue} from 'react-native-responsive-fontsize';
import {useDispatch, useSelector} from 'react-redux';
import {
  getHospitalList_bodyPart,
  setUserPosition,
} from '../../../store/slices/hospitalSlice';

import styled from 'styled-components';

import Icons from '../../../aseets/Global/Icons';
import HeaderBar from '../../../components/Global/HeaderBar';

import BodyPart from '../../../components/NormalUser/Hospital/BodyPart';
import BodyPartModal from '../../../components/NormalUser/Hospital/BodyPartModal';

const spinnerColor = '#885fff';
const {height} = Dimensions.get('window');

const BodyPartScreen = props => {
  //바텀탭 높이 _ 스크롤뷰
  const bottomTabHeight = useBottomTabBarHeight();
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.hospital.isLoading);
  const [showModal, setShowModal] = useState(false);
  const [selectedBodyPart, setSelectedBodyPart] = useState('');
  const [error, setError] = useState(false);
  const [isLocationGetting, setIsLocationGetting] = useState(false);

  //병원 리스트 조회 전 위치 권한 확인 함수
  const checkLocationPermission = async () => {
    try {
      let result = await check(
        Platform.select({
          ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
          android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        }),
      );
      if (result === RESULTS.DENIED) {
        result = await request(
          Platform.select({
            ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
            android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
          }),
        );
      }
      console.log('Result:', result);
      return result === RESULTS.GRANTED;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  // 현재 위치의 위도와 경도 가져오기
  const getUserPosition = () => {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        position => {
          console.log(position);
          resolve(position);
        },
        error => {
          console.log(error);
          reject(
            '앱을 사용하기 위해서는 위치 정보를 사용해야 합니다. 설정에서 위치 정보를 켜주세요.',
          );
        },
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
      );
    });
  };

  //병원 리스트 조회 핸들러 (사용자가 선택한 신체부위를 신체부위 핸들러로 dispatch)
  const getHospitalListHandler = useCallback(
    async selectedPart => {
      setError(null);
      try {
        const hasLocationPermission = await checkLocationPermission(); // 위치 권한 확인
        if (!hasLocationPermission) {
          Alert.alert('위치 권한을 허용해주어야 합니다.', undefined, [
            {text: '취소', style: 'cancel'},
            {
              text: '설정으로 이동',
              onPress: () => {
                Linking.openSettings();
              },
            },
          ]);
          return;
        }
        //getCurrentPosition이 시간을 꽤 먹어서 위치가져올 때 LoadingView를 렌더링하기 위한 state변수
        setIsLocationGetting(true);
        const position = await getUserPosition();
        setIsLocationGetting(false);

        //사용자 위치 GET
        await dispatch(
          setUserPosition({
            userLatitude: position.coords.latitude,
            userLongitude: position.coords.longitude,
          }),
        );
        //사용자의 신체부위 선택, 위치를 기반으로 병원리스트 조회
        await dispatch(
          getHospitalList_bodyPart({
            part: selectedPart,
            userLatitude: position.coords.latitude,
            userLongitude: position.coords.longitude,
          }),
        ).unwrap();
        props.navigation.navigate('hospitalList');
      } catch (error) {
        //예외처리
        setError(error.message);
      }
    },
    [dispatch],
  );

  //예외처리 알림문
  useEffect(() => {
    if (error) {
      Alert.alert('병원 불러오기 실패', error, [{text: '확인'}]);
    }
  }, [error]);

  return (
    <Container>
      {isLoading || isLocationGetting ? (
        <LoadingView>
          <ActivityIndicator size="large" color={spinnerColor} />
          <LoadingText>
            병원 정보를 불러오고 있어요 {'\n'} 잠시만 기다려주세요...
          </LoadingText>
        </LoadingView>
      ) : (
        <View>
          <HeaderBar.leftCenter
            leadingAction={() => {
              props.navigation.goBack();
            }}
            leadingIcon={<Icons.arrowBack />}
            centerTitle="신체부위"
          />
          <Title>
            진료 받고싶은
            <HighlightText> 신체부위를 선택</HighlightText>해주세요!
          </Title>
          <ScrolleWrapper>
            <Wrapper bottomTabHeight={bottomTabHeight}>
              <BodyPart
                onBodyPartSelect={selectedPart => {
                  setSelectedBodyPart(selectedPart);
                  if (
                    selectedPart === '머리관련부위' ||
                    selectedPart === '체간관련부위'
                  ) {
                    setShowModal(true);
                  } else {
                    getHospitalListHandler(selectedPart);
                  }
                }}
              />
            </Wrapper>
          </ScrolleWrapper>
          <BodyPartModal
            value={selectedBodyPart}
            isVisible={showModal}
            onModalCancel={() => setShowModal(false)}
            onBackdropPress={() => setShowModal(false)}
            onBodyPartSelect={selectedPart => {
              setShowModal(false);
              getHospitalListHandler(selectedPart);
            }}
          />
        </View>
      )}
    </Container>
  );
};

const Container = styled.SafeAreaView`
  background-color: ${props => props.theme.colors.white};
  flex: 1;
`;
const LoadingView = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
`;
const LoadingText = styled.Text`
  margin-top: 20px;
  font-size: ${RFValue(15)}px;
  text-align: center;
  color: ${props => props.theme.colors.gray3};
`;
const Title = styled.Text`
  align-self: center;
  font-size: ${RFValue(15)}px;
  margin-top: ${height / 20}px;
  color: ${props => props.theme.colors.black};
`;

const HighlightText = styled.Text`
  font-weight: bold;
`;
const ScrolleWrapper = styled.ScrollView`
  margin-top: ${height / 40}px;
`;
const Wrapper = styled.View`
  margin-bottom: ${props => props.bottomTabHeight + 70}px;
`;

export default BodyPartScreen;
