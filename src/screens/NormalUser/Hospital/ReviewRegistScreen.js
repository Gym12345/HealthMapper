import React, {useState, useEffect} from 'react';
import {Alert, Dimensions} from 'react-native';

import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {RFValue} from 'react-native-responsive-fontsize';
import {useDispatch, useSelector} from 'react-redux';
import {reviewRegist} from '../../../store/slices/reviewSlice';

import StarRating from 'react-native-star-rating-widget';
import styled from 'styled-components';
import HeaderBar from '../../../components/Global/HeaderBar';
import Icons from '../../../aseets/Global/Icons';

const {height} = Dimensions.get('window');

const ReviewRegistScreen = props => {
  const dispatch = useDispatch();
  //바텀탭 높이 _ 스크롤뷰
  const bottomTabHeight = useBottomTabBarHeight();
  const selectedHospital = props.route.params.selectedHospital;
  const userId = useSelector(state => state.auth.userId);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [buttonActive, setButtonActive] = useState(false);

  //comment가 입력되면 버튼 활성화
  useEffect(() => {
    if (comment.length > 0) {
      setButtonActive(true);
    } else {
      setButtonActive(false);
    }
  }, [comment]);

  //리뷰 등록 핸들러
  const submitReviewHandler = async () => {
    try {
      await dispatch(
        reviewRegist({
          hName: selectedHospital.name,
          userId,
          hrComment: comment,
          hrRate: rating,
        }),
      ).unwrap();
      Alert.alert('리뷰 등록에 성공했습니다', null, [
        {
          text: '확인',
          onPress: () =>
            props.navigation.navigate('hospitalDetail', {
              selectedHospital: selectedHospital,
            }),
        },
      ]);
    } catch (error) {
      console.log(error.message);
      Alert.alert(error.message, null, [
        {
          text: '확인',
        },
      ]);
    }
  };

  return (
    <Container>
      <HeaderBar.leftCenter
        leadingAction={() => {
          props.navigation.goBack();
        }}
        leadingIcon={<Icons.cancel />}
        centerTitle={selectedHospital.name}
      />
      <ScrollWrapper>
        <RatingContainer>
          <HospitalName>
            <HighlightText>{selectedHospital.name}</HighlightText>의
          </HospitalName>
          <RatingTitle>진료는 어떠셨나요?</RatingTitle>
          <StarRating
            starSize={40}
            enableHalfStar={false}
            rating={rating}
            onChange={setRating}
            color="#885FFF"
          />
        </RatingContainer>
        {!rating ? null : (
          <ReviewContainer bottomTabHeight={bottomTabHeight}>
            <ReviewWrapper>
              <ReviewInput
                multiline={true}
                placeholder="진료받은 병원의 후기를 남겨보세요(필수사항)"
                placeholderTextColor="#A09FAB"
                value={comment}
                onChangeText={text => {
                  setComment(text);
                }}
              />
            </ReviewWrapper>
            <ReviewRegistButton
              active={buttonActive}
              disabled={!buttonActive}
              onPress={submitReviewHandler}>
              <ButtonText active={buttonActive}>완료</ButtonText>
            </ReviewRegistButton>
          </ReviewContainer>
        )}
      </ScrollWrapper>
    </Container>
  );
};

const Container = styled.SafeAreaView`
  background-color: ${props => props.theme.colors.white};
`;
const ScrollWrapper = styled.ScrollView``;
const RatingContainer = styled.View`
  align-items: center;
  margin-top: ${height / 10}px;
`;
const HospitalName = styled.Text`
  font-size: ${RFValue(17)}px;
  font-weight: bold;
  color: ${props => props.theme.colors.black};
`;
const RatingTitle = styled.Text`
  font-size: ${RFValue(15)}px;
  font-weight: bold;
  color: ${props => props.theme.colors.black};
  margin-bottom: ${height / 40}px;
`;
const HighlightText = styled.Text`
  color: ${props => props.theme.colors.patientColor};
`;
const ReviewContainer = styled.View`
  margin-bottom: ${props => props.bottomTabHeight}px;
  padding: 30px;
`;
const ReviewWrapper = styled.View`
  height: ${height / 4}px;
  padding-self: 10px;
  border: 1px;
  border-radius: 10px;
  padding-horizontal: 20px;
  padding-vertical: 10px;
`;
const ReviewInput = styled.TextInput`
  font-size: ${RFValue(13)}px;
  color: ${props => props.theme.colors.black};
`;
const ReviewRegistButton = styled.TouchableOpacity`
  margin-top: ${height / 15}px;
  padding: 10px;
  border-radius: 10px;
  background-color: ${props =>
    props.active ? props.theme.colors.patientColor : props.theme.colors.gray6};
  align-items: center;
`;
const ButtonText = styled.Text`
  font-weight: bold;
  font-size: ${RFValue(18)}px;
  margin-vertical: 5px;
  color: ${props =>
    props.active ? props.theme.colors.white : props.theme.colors.gray4};
`;
export default ReviewRegistScreen;
