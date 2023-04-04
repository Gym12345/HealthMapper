import React, {useState, useCallback} from 'react';
import {Alert, Dimensions} from 'react-native';

import styled from 'styled-components';

import InputForm from '../../components/Auth/InputForm';
import DivisionLine from '../../components/Auth/DivisionLine';
import ClassSelector from '../../components/Auth/ClassSelector';

const {width, height} = Dimensions.get('window');

//추후 redux에서 사용
const LoginScreen = props => {
  const [userId, setUserId] = useState('');
  const [userPw, setUserPw] = useState('');
  const [userClass, setUserClass] = useState('');
  const [isActive, setActive] = useState(true);

  const handleLogin = useCallback(async () => {
    try {
      // 안드로이드 api test시에는 ip주소 입력.
      const response = await fetch(
        'http://localhost:8090/Health/Health1/LoginController',
        {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            userId,
            userPw,
            userClass,
          }),
        },
      );

      const resData = await response.json();
      console.log(resData); //서버에서 응답받은 data

      if (resData.success) {
        console.log('로그인 성공:', resData);
        props.navigation.navigate('test', {userId}); //로그인 성공시 testScreen 이동. (추후 redux사용할거기에 파라미터도 삭제해야함. 나중에) )
      } else {
        console.error('로그인 실패:', resData);
        setActive(false); //로그인 실패시 alertText활성
      }
    } catch (error) {
      console.error(error);
      Alert.alert(error);
    }
  }, [userId, userPw, userClass]);

  return (
    <Container>
      <TitleContainer>
        <TitleText>Health Mapper</TitleText>
      </TitleContainer>
      <AuthContainer>
        <ClassSelector setSelectedValue={setUserClass} />
        <InputForm
          id="id"
          placeholder="아이디를 입력해주세요."
          onChangeText={text => {
            setUserId(text);
            setActive(true); //alertText해제
          }}
        />
        <InputForm
          id="password"
          placeholder="비밀번호를 입력해주세요."
          onChangeText={text => {
            setUserPw(text);
            setActive(true); //alertText해제
          }}
        />
        {isActive ? null : (
          <ErrorText>
            올바른 아이디와 패스워드 및 용도를 선택해주세요.
          </ErrorText>
        )}
        <LoginButtonWrapper isLogin={true} onPress={handleLogin}>
          <LoginButtonText isLogin={true}>로그인</LoginButtonText>
        </LoginButtonWrapper>

        <TextButtonContainer>
          <TextButtonWrapper onPress={() => {}}>
            <FindIdText>아이디 찾기</FindIdText>
          </TextButtonWrapper>
          <TextButtonWrapper
            onPress={() => props.navigation.navigate('signup')}>
            <SignUpText>회원가입</SignUpText>
          </TextButtonWrapper>
        </TextButtonContainer>
      </AuthContainer>
      <DivisionLine DivisionText="or" />
      <BottomContainer>
        <LoginButtonWrapper isLogin={false} onPress={() => {}}>
          <LoginButtonText isLogin={false}>
            로그인 없이 서비스 사용하기
          </LoginButtonText>
        </LoginButtonWrapper>
      </BottomContainer>
    </Container>
  );
};

const Container = styled.SafeAreaView``;
const TitleContainer = styled.View`
  align-items: center;
  margin-top: ${height / 10}px;
`;
const TitleText = styled.Text`
  font-size: 30px;
  font-weight: bold;
  color: ${props => props.theme.colors.patientColor};
`;
const AuthContainer = styled.View`
  padding-horizontal: 30px;
  margin-top: ${height / 40}px;
`;
const ErrorText = styled.Text`
  margin-top: 5px;
  color: ${props => props.theme.colors.alertColor};
  font-size: 12px;
`;
const LoginButtonWrapper = styled.TouchableOpacity`
  background-color: ${props =>
    props.isLogin ? props.theme.colors.patientColor : props.theme.colors.gray6};
  justify-content: center;
  align-items: center;
  padding: 15px;
  border-radius: 20px;
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
