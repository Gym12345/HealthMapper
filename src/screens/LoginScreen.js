import React, {useState} from 'react';
import axios from 'axios';
import styled from 'styled-components';
import HeaderBar from '../components/Global/HeaderBar';

const LoginScreen = props => {
  const [userId, setUserId] = useState('');
  const [userPw, setUserPw] = useState('');
  const [userClass, setUserClass] = useState('');

  const handleLogin = async () => {
    try {
      // 안드로이드 api test시에는 ip주소 입력.
      const response = await axios.post(
        'http://172.30.1.55:8090/Health/Health1/LoginController',
        {
          userId: userId,
          userPw: userPw,
          userClass: userClass,
        },
        {headers: {'Content-Type': 'application/json'}},
      );
      console.log(response); //응답받은 데이터 로그출력.
      console.log('전송된 데이터:', userId, userPw, userClass);

      //성공 경로
      if (response.data.success == true) {
        console.log('로그인 성공:', response.data.message);
        alert('로그인 성공');
        props.navigation.navigate('home', {userId: userId});
      }
      //실패경로
      else {
        console.error('로그인 실패:', response.data);
        console.log(response.data.message);
        alert('로그인 실패');
        // 로그인 실패 시 알림창과 같은 것을 띄울 예정
      }
    } catch (error) {
      console.error(error);
      // 에러 발생 시 알림창과 같은 것을 띄울 예정
    }
  };

  return (
    <Container>
      <HeaderBar.centerOnly centerTitle="로그인" />
      <InputWrapper>
        <WrapperTitle>로그인 폼</WrapperTitle>
        <InputIdWrapper
          type="text"
          placeholder="아이디를 입력해주세요."
          onChangeText={text => setUserId(text)}
        />
        <InputPwWrapper
          placeholder="비밀번호를 입력해주세요."
          onChangeText={text => setUserPw(text)}
        />
        <InputClassWrapper
          placeholder="클래스를 입력해주세요."
          onChangeText={text => setUserClass(text)}
        />
      </InputWrapper>
      <ButtonWrapper onPress={handleLogin}>
        <ButtonText>로그인</ButtonText>
      </ButtonWrapper>
    </Container>
  );
};

const Container = styled.SafeAreaView``;
const InputWrapper = styled.View`
  background-color: lightgray;
  padding: 30px;
  margin: 20px;
  border-radius: 50px;
`;
const WrapperTitle = styled.Text``;
const InputIdWrapper = styled.TextInput`
  background-color: lightblue;
  margin-top: 20px;
  border-radius: 30px;
  padding: 10px;
`;
const InputPwWrapper = styled.TextInput`
  background-color: lightblue;
  margin-top: 20px;
  border-radius: 30px;
  padding: 10px;
`;
const InputClassWrapper = styled.TextInput`
  background-color: lightblue;
  margin-top: 20px;
  border-radius: 30px;
  padding: 10px;
`;
const ButtonWrapper = styled.TouchableOpacity`
  background-color: lightblue;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
  padding: 20px;
  border-radius: 30px;
  width: 100px;
`;
const ButtonText = styled.Text``;

export default LoginScreen;
