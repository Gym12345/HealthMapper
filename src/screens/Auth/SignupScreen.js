import React from 'react';

import styled from 'styled-components';

import HeaderBar from '../../components/Global/HeaderBar';
import Icons from '../../aseets/Icons';

const SignupScreen = props => {
  return (
    <Container>
      <HeaderBar.leftCenter
        leadingAction={() => {
          props.navigation.goBack();
        }}
        leadingIcon={<Icons.arrowBack />}
        centerTitle="회원가입"
      />
      <IsText>회원가입 스크린</IsText>
    </Container>
  );
};

const Container = styled.SafeAreaView`
  background-color: ${props => props.theme.colors.white};
`;
const IsText = styled.Text``;

export default SignupScreen;
