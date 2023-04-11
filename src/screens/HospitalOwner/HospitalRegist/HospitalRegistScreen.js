import React from 'react';

import HeaderBar from '../../../components/Global/HeaderBar';
import styled from 'styled-components';

const HospitalRegistScreen = props => {
  return (
    <Container>
      <HeaderBar.leftCenter
        leadingAction={() => {
          props.navigation.goBack();
        }}
        leadingIcon={<Icons.arrowBack />}
        centerTitle="병원 등록하기"
      />
      <Title>병원 등록 스크린</Title>
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

export default HospitalRegistScreen;
