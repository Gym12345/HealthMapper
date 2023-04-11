import React from 'react';

import styled from 'styled-components';

import Icons from '../../../aseets/Icons';
import HeaderBar from '../../../components/Global/HeaderBar';

const MedicalDepartmentScreen = props => {
  return (
    <Container>
      <HeaderBar.leftCenter
        leadingAction={() => {
          props.navigation.goBack();
        }}
        leadingIcon={<Icons.arrowBack />}
        centerTitle="진료과 선택"
      />
      <TestText>진료과 선택 스크린.</TestText>
    </Container>
  );
};

const Container = styled.SafeAreaView`
  background-color: ${props => props.theme.colors.white};
`;
const TestText = styled.Text``;

export default MedicalDepartmentScreen;
