import React, {useEffect, useState, useCallback} from 'react';
import {Alert, Dimensions, Platform} from 'react-native';
import {useDispatch} from 'react-redux';

import {PERMISSIONS, RESULTS, request} from 'react-native-permissions';
import {RFValue} from 'react-native-responsive-fontsize';
import {login, guestLogin} from '../../../store/slices/authSlice';
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

  //게스트 로그인 핸들러
  const guestLoginHandler = useCallback(async () => {
    setError(null);
    try {
      await dispatch(guestLogin()); //login api dispatch_로그인 경로1
      props.navigation.navigate('main'); // bottomTabNavigator 진입
    } catch (error) {
      setError(error.message);
    }
  }, [dispatch]);

  //일반사용자, 병원소유자 로그인 핸들러
  const loginHandler = useCallback(async () => {
    setError(null);
    try {
      await dispatch(login({userId, userPw, userClass})).unwrap(); //login api dispatch_로그인 경로1
      props.navigation.navigate('main'); // bottomTabNavigator 진입
      setUserClass('');
      setUserId('');
      setUserPw('');
    } catch (error) {
      setError(error.message);
    }
  }, [dispatch, userId, userPw, userClass]);

  useEffect(() => {
    if (error) {
      Alert.alert('로그인 실패', error, [{text: '확인'}]);
    }
  }, [error]);

  /* 
  useEffect(() => {
    if (Platform.OS === 'android') {
    } else if (Platform.OS == 'ios') {
    }
    requestLocationPermission();
  }, []);
  */

  return (
    <Container>
      <ScrollWrapper>
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
            value={userId}
            autoCapitalize="none"
            isPasswordForm={false}
            placeholder="아이디를 입력해주세요"
            onChangeText={text => {
              setUserId(text);
            }}
          />
          <LoginInputForm
            id="password"
            value={userPw}
            autoCapitalize="none"
            isPasswordForm={true}
            placeholder="비밀번호를 입력해주세요"
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
            onPress={guestLoginHandler}>
            <LoginButtonText isLogin={false}>
              로그인 없이 이용하기
            </LoginButtonText>
          </LoginButtonWrapper>
        </BottomContainer>
      </ScrollWrapper>
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
  font-size: ${RFValue(35)}px;
  font-weight: bold;
  color: ${props => props.theme.colors.patientColor};
`;
const ScrollWrapper = styled.ScrollView``;
const AuthContainer = styled.KeyboardAvoidingView`
  padding-horizontal: 30px;
  margin-top: ${height / 60}px;
`;
const LoginButtonWrapper = styled.TouchableOpacity`
  background-color: ${props =>
    props.isLogin ? props.theme.colors.patientColor : props.theme.colors.gray7};
  justify-content: center;
  align-items: center;
  padding: 13px;
  border-radius: 30px;
  margin-top: ${props => (props.isLogin ? height / 15 : height / 30)}px;
`;
const LoginButtonText = styled.Text`
  font-weight: bold;
  font-size: ${RFValue(20)}px;
  color: ${props =>
    props.isLogin ? props.theme.colors.gray8 : props.theme.colors.patientColor};
`;
const TextButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  margin-top: ${height / 35}px;
`;
const TextButtonWrapper = styled.TouchableOpacity``;
const SignUpText = styled.Text`
  font-size: ${RFValue(16)}px;
  color: ${props => props.theme.colors.gray3};
`;
const FindIdText = styled.Text`
  font-size: ${RFValue(16)}px;
  color: ${props => props.theme.colors.gray3};
`;
const BottomContainer = styled.View`
  margin-horizontal: 30px;
  margin-bottom: ${height / 10}px;
`;
export default LoginScreen;
