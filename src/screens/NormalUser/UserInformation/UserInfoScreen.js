import React, {useCallback} from 'react';
import {Alert} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import HeaderBar from '../../../components/Global/HeaderBar';
import styled from 'styled-components';
import {logout} from '../../../store/slices/authSlice';

const UserInfoScreen = props => {
  const userName = useSelector(state => state.auth.userName);
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
      <Title>현재 입력하신 계정은 {userName} 입니다.</Title>
      <ButtonWrapper onPress={logoutHandler}>
        <LogoutButtonText>로그아웃</LogoutButtonText>
      </ButtonWrapper>
    </Container>
  );
};

const Container = styled.SafeAreaView`
  background-color: ${props => props.theme.colors.white};
`;
const Title = styled.Text``;
const ButtonWrapper = styled.TouchableOpacity`
  margin-top: 50px;
  align-self: center;
  background-color: ${props => props.theme.colors.patientColor};
  padding: 15px;
  border-radius: 15px;
`;
const LogoutButtonText = styled.Text`
  font-size: 30px;
  color: ${props => props.theme.colors.white};
`;

export default UserInfoScreen;
