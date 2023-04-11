import React from 'react';

import HeaderBar from '../../../components/Global/HeaderBar';
import styled from 'styled-components';

const HospitalRegistHomeScreen = props => {
  return (
    <Container>
      <HeaderBar.centerOnly centerTitle="홈 스크린" />
      <ButtonWrapper
        onPress={() => {
          props.navigation.navigate('hospitalRegist');
        }}>
        <Title>병원을 등록할래요?</Title>
      </ButtonWrapper>
    </Container>
  );
};

const Container = styled.SafeAreaView`
  background-color: ${props => props.theme.colors.white};
`;
const ButtonWrapper = styled.TouchableOpacity`
  margin-top: 50px;
  align-self: center;
  padding: 10px;
  background-color: ${props => props.theme.colors.gray6};
  border-radius: 20px;
`;
const Title = styled.Text`
  font-weight: bold;
  color: ${props => props.theme.colors.black};
  font-size: 20px;
`;

export default HospitalRegistHomeScreen;
