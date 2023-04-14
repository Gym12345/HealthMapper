import React from 'react';

import HeaderBar from '../../../components/Global/HeaderBar';
import styled from 'styled-components';

const HomeScreen = props => {
  return (
    <Container>
      <HeaderBar.centerOnly centerTitle="병원 추천받기" />
      <ButtonWrapper
        onPress={() => {
          props.navigation.navigate('bodyPart');
        }}>
        <Title>신체부위를 선택할래요?</Title>
      </ButtonWrapper>
      <ButtonWrapper
        onPress={() => {
          props.navigation.navigate('medicalDepartment');
        }}>
        <Title>진료과를 선택할래요?</Title>
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

export default HomeScreen;
