import React, {useCallback} from 'react';
import {Alert, Dimensions} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import {RFValue} from 'react-native-responsive-fontsize';
import HeaderBar from '../../../components/Global/HeaderBar';
import styled from 'styled-components';
import Icons from '../../../aseets/Global/Icons';

import {logout} from '../../../store/slices/authSlice';

import UserInfo from '../../../components/NormalUser/Info/UserInfo';

const {height} = Dimensions.get('window');
const UserInfoScreen = props => {
  const userId = useSelector(state => state.auth.userId);
  const dispatch = useDispatch();

  const logoutHandler = useCallback(async () => {
    try {
      await dispatch(logout());
      Alert.alert('안내', '로그아웃이 완료되었습니다.', [
        {
          text: '확인',
          onPress: () => {
            props.navigation.navigate('auth');
          },
        },
      ]);
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  return (
    <Container>
      <HeaderBar.leftCenter
        leadingAction={() => {
          props.navigation.goBack();
        }}
        leadingIcon={<Icons.arrowBack />}
        centerTitle="사용자 정보"
      />
      <UserWrapper>
        <Icons.userProfile />
        <UserIdText>
          <HighlightText>{userId}</HighlightText>님 환영합니다
        </UserIdText>
      </UserWrapper>
      <DivisionLine />
      <UserInfo onCheckHealthMemo={() => {}} onCheckMyReview={() => {}} />
      <ButtonWrapper onPress={logoutHandler}>
        <LogoutButtonText>로그아웃</LogoutButtonText>
      </ButtonWrapper>
    </Container>
  );
};

const Container = styled.SafeAreaView`
  background-color: ${props => props.theme.colors.white};
`;

const UserWrapper = styled.View`
  margin-top: ${height / 30}px;
  flex-direction: row;
  padding: 30px;
  align-items: center;
`;
const UserIdText = styled.Text`
  text-align: center;
  color: ${props => props.theme.colors.black};
  margin-left: 20px;
  font-size: ${RFValue(13)}px;
`;
const HighlightText = styled.Text`
  font-size: ${RFValue(20)}px;
  font-weight: bold;
`;

const DivisionLine = styled.View`
  background-color: ${props => props.theme.colors.gray7};
  align-self: center;
  width: 90%;
  height: 1px;
`;
const ButtonWrapper = styled.TouchableOpacity`
  margin-top: 30px;
  align-self: center;
  align-items: center;
  background-color: ${props => props.theme.colors.patientColor};
  padding: 15px;
  width: 90%;
  border-radius: 15px;
`;
const LogoutButtonText = styled.Text`
  font-size: ${RFValue(20)}px;
  color: ${props => props.theme.colors.white};
`;

export default UserInfoScreen;
