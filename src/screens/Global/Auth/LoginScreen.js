import React, {useEffect, useState, useCallback} from 'react';
import {Alert, Dimensions} from 'react-native';
import {useDispatch} from 'react-redux';

import {login} from '../../../store/slices/authSlice';
import styled from 'styled-components';

import LoginInputForm from '../../../components/Auth/LoginInputForm';
import DivisionLine from '../../../components/Auth/DivisionLine';
import ClassSelector from '../../../components/Auth/ClassSelector';

const {height} = Dimensions.get('window');

const LoginScreen = props => {
  const [userId, setUserId] = useState('');
  const [userPw, setUserPw] = useState('');
  const [userClass, setUserClass] = useState('');
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  const loginHandler = useCallback(async () => {
    setError(null);
    try {
      await dispatch(login({userId, userPw, userClass})).unwrap(); //login api dispatch_로그인 경로1
      props.navigation.navigate('main'); // bottomTabNavigator 진입
    } catch (error) {
      setError(error.message);
    }
  }, [dispatch, userId, userPw, userClass]);

  useEffect(() => {
    if (error) {
      Alert.alert('오류가 발생했습니다.', error, [{text: '확인'}]);
    }
  }, [error]);

  return (
    <Container>
      <TitleContainer>
        <TitleText>Health Mapper</TitleText>
      </TitleContainer>
      <AuthContainer>
        <ClassSelector
          isSelectedValue={userClass}
          setSelectedValue={setUserClass}
        />
        <LoginInputForm
          id="id"
          autoCapitalize="none"
          isPasswordForm={false}
          placeholder="아이디를 입력해주세요."
          onChangeText={text => {
            setUserId(text);
          }}
        />
        <LoginInputForm
          id="password"
          autoCapitalize="none"
          isPasswordForm={true}
          placeholder="비밀번호를 입력해주세요."
          onChangeText={text => {
            setUserPw(text);
          }}
        />
        <LoginButtonWrapper
          activeOapcity={0.5}
          isLogin={true}
          onPress={loginHandler}>
          <LoginButtonText isLogin={true}>로그인</LoginButtonText>
        </LoginButtonWrapper>

        <TextButtonContainer>
          <TextButtonWrapper activeOapcity={0.5} onPress={() => {}}>
            <FindIdText>아이디 찾기</FindIdText>
          </TextButtonWrapper>
          <TextButtonWrapper
            activeOapcity={0.5}
            onPress={() => props.navigation.navigate('signup')}>
            <SignUpText>회원가입</SignUpText>
          </TextButtonWrapper>
        </TextButtonContainer>
      </AuthContainer>
      <DivisionLine DivisionText="or" />
      <BottomContainer>
        <LoginButtonWrapper
          isLogin={false}
          activeOapcity={0.5}
          onPress={() => {
            props.navigation.navigate('main', {userId: null, userClass: null});
          }}>
          <LoginButtonText isLogin={false}>
            로그인 없이 서비스 사용하기
          </LoginButtonText>
        </LoginButtonWrapper>
      </BottomContainer>
    </Container>
  );
};

const Container = styled.SafeAreaView`
  background-color: ${props => props.theme.colors.white};
  flex: 1;
`;
const TitleContainer = styled.View`
  align-items: center;
  margin-top: ${height / 10}px;
  margin-bottom: ${height / 30}px;
`;
const TitleText = styled.Text`
  font-size: 35px;
  font-weight: bold;
  color: ${props => props.theme.colors.patientColor};
`;
const AuthContainer = styled.View`
  padding-horizontal: 30px;
  margin-top: ${height / 40}px;
`;
const LoginButtonWrapper = styled.TouchableOpacity`
  background-color: ${props =>
    props.isLogin ? props.theme.colors.patientColor : props.theme.colors.gray6};
  justify-content: center;
  align-items: center;
  padding: 15px;
  border-radius: 15px;
  margin-top: ${props => (props.isLogin ? height / 15 : height / 30)}px;
`;
const LoginButtonText = styled.Text`
  font-weight: bold;
  font-size: 20px;
  color: ${props =>
    props.isLogin ? props.theme.colors.gray6 : props.theme.colors.patientColor};
`;
const TextButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  margin-top: ${height / 35}px;
`;
const TextButtonWrapper = styled.TouchableOpacity``;
const SignUpText = styled.Text`
  font-size: 16px;
  color: ${props => props.theme.colors.gray3};
`;
const FindIdText = styled.Text`
  font-size: 16px;
  color: ${props => props.theme.colors.gray3};
`;
const BottomContainer = styled.View`
  margin-horizontal: 30px;
`;
export default LoginScreen;
