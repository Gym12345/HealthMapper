import React, {useState} from 'react';
import {Dimensions, Alert} from 'react-native';

import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components';
import HeaderBar from '../../../components/Global/HeaderBar';
import Icons from '../../../aseets/Icons';
import SignupInputForm from '../../../components/Auth/SignupInputForm';
import ClassSelector from '../../../components/Auth/ClassSelector';
import AgreeTermsButtons from '../../../components/Auth/AgreeTermsButtons';

const {height} = Dimensions.get('window');

const SignupScreen = props => {
  const [userId, setUserId] = useState('');
  const [userPw, setUserPw] = useState('');
  const [userClass, setUserClass] = useState('');
  const [isTotalAgree, setTotalAgree] = useState(false);
  const [isSignupActive, setSignupActive] = useState(true);

  //네트워크 연결할때 싹 수정.
  const signupHandler = () => {
    console.log(userId + ' ' + userPw + ' ' + userClass + ' ' + isTotalAgree);
    if (
      (userId !== '') &
      (userPw !== '') &
      (userClass !== '') &
      (isTotalAgree === true)
    ) {
      Alert.alert('안내', '회원가입이 완료되었습니다.', [
        {
          text: '확인',
          onPress: () => props.navigation.navigate('login'),
        },
      ]);
      setSignupActive(true);
    } else {
      Alert.alert('안내', '회원가입이 실패했습니다.', [
        {
          text: '확인',
          style: 'cancel',
        },
      ]);
      setSignupActive(false);
      console.log(userClass);
    }
  };

  return (
    <Container>
      <HeaderBar.leftCenter
        leadingAction={() => {
          props.navigation.goBack();
        }}
        leadingIcon={<Icons.arrowBack />}
        centerTitle="회원가입"
      />
      <AuthWrapper>
        <ClassSelectForm>
          <FormTitle>권한</FormTitle>
          <ClassSelector
            isSelectedValue={userClass}
            setSelectedValue={setUserClass}
          />
        </ClassSelectForm>
        {(userClass === '') & !isSignupActive ? (
          <ErrorText>권한을 선택해주세요.</ErrorText>
        ) : null}
        <SignupInputForm
          active={isSignupActive || userId}
          formTitle="아이디"
          autoCapitalize="none"
          placeholder="아이디를 입력해주세요."
          isPasswordForm={false}
          onChangeText={text => {
            setUserId(text);
          }}
        />
        {(userId === '') & !isSignupActive ? (
          <ErrorText>올바른 아이디를 입력해주세요.</ErrorText>
        ) : null}
        <SignupInputForm
          active={isSignupActive || userPw}
          formTitle="패스워드"
          autoCapitalize="none"
          placeholder="비밀번호를 입력해주세요."
          isPasswordForm={true}
          onChangeText={text => {
            setUserPw(text);
          }}
        />
        {(userPw === '') & !isSignupActive ? (
          <ErrorText>올바른 비밀번호를 입력해주세요.</ErrorText>
        ) : null}
        <AgreeTermsButtons
          onPressTextButton={value => {
            props.navigation.navigate('terms', {value});
            console.log(value);
          }}
          isTotalActive={isTotalAgree}
          setTotalActive={setTotalAgree}
          signUp={isSignupActive}
        />
        {!isTotalAgree & !isSignupActive ? (
          <ErrorText>전체 동의를 해주세요.</ErrorText>
        ) : null}
        <SignupButtonWrapper activeOapcity={0.5} onPress={signupHandler}>
          <SignupButtonText>회원가입</SignupButtonText>
        </SignupButtonWrapper>
      </AuthWrapper>
    </Container>
  );
};

const Container = styled.SafeAreaView`
  background-color: ${props => props.theme.colors.white};
  flex: 1;
`;
const AuthWrapper = styled.View`
  padding-horizontal: 30px;
  margin-top: ${height / 20}px;
`;
const ClassSelectForm = styled.View``;
const FormTitle = styled.Text`
  margin-top: ${height / 35}px;
  margin-vertical: 8px;
  font-weight: bold;
  color: ${props => props.theme.colors.black};
  font-size: ${RFValue(15)}px;
`;

const SignupButtonWrapper = styled.TouchableOpacity`
  background-color: ${props => props.theme.colors.patientColor};
  justify-content: center;
  align-items: center;
  padding: 15px;
  border-radius: 15px;
  margin-top: ${height / 30}px;
`;
const SignupButtonText = styled.Text`
  font-weight: bold;
  font-size: ${RFValue(20)}px;
  color: ${props => props.theme.colors.gray6};
`;
const ErrorText = styled.Text`
  color: ${props => props.theme.colors.alertColor};
  font-size: ${RFValue(12)}px;
`;
export default SignupScreen;
