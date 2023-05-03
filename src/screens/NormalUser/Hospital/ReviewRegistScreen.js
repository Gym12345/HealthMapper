import React, {useState, useCallback} from 'react';
import {Text, Button, Alert, Dimensions} from 'react-native';

import {useSelector} from 'react-redux';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {RFValue} from 'react-native-responsive-fontsize';

import StarRating from 'react-native-star-rating-widget';
import styled from 'styled-components';
import HeaderBar from '../../../components/Global/HeaderBar';
import Icons from '../../../aseets/Global/Icons';

const {height} = Dimensions.get('window');

const ReviewRegistScreen = props => {
  const userClass = useSelector(state => state.auth.userClass);
  //바텀탭 높이 _ 스크롤뷰
  const bottomTabHeight = useBottomTabBarHeight();
  const selectedHospital = props.route.params.selectedHospital;
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState(null);

  // 게스트 사용자에게 로그인 안내 알림창. 후기는 로그인 시에만 가능한 기능.
  const showLoginScreen = useCallback(() => {
    Alert.alert('안내', '로그인이 필요한 서비스입니다', [
      {
        text: '확인',
        onPress: () => props.navigation.navigate('auth'),
      },
    ]);
  }, [showLoginScreen]);

  return (
    <Container>
      <HeaderBar.leftCenter
        leadingAction={() => {
          props.navigation.goBack();
        }}
        leadingIcon={<Icons.cancel />}
        centerTitle={selectedHospital.name}
      />
      {userClass === 'guest' ? (
        showLoginScreen()
      ) : (
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
                  placeholder="진료받은 병원의 후기를 남겨보세요(선택사항)"
                  value={comment}
                  onChangeText={text => {
                    setComment(text);
                  }}
                />
              </ReviewWrapper>
              <ReviewRegistButton
                onPress={() => {
                  props.navigation.navigate('hospitalDetail', {
                    selectedHospital: selectedHospital,
                  });
                }}>
                <ButtonText>완료</ButtonText>
              </ReviewRegistButton>
            </ReviewContainer>
          )}
        </ScrollWrapper>
      )}
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
`;
const ReviewRegistButton = styled.TouchableOpacity`
  margin-top: ${height / 10}px;
  padding: 10px;
  border-radius: 10px;
  background-color: ${props => props.theme.colors.patientColor};
  align-items: center;
`;
const ButtonText = styled.Text`
  font-weight: bold;
  font-size: ${RFValue(18)}px;
  margin-vertical: 5px;
  color: ${props => props.theme.colors.white};
`;
export default ReviewRegistScreen;
