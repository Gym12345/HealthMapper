import React from 'react';

import styled from 'styled-components';
import HeaderBar from '../../../components/Global/HeaderBar';
import Icons from '../../../aseets/Global/Icons';

const HospitalListScreen = props => {
  return (
    <Container>
      <HeaderBar.leftCenter
        leadingAction={() => {
          props.navigation.goBack();
        }}
        leadingIcon={<Icons.arrowBack />}
        centerTitle="진료과 선택"
      />
      <Title>
        선택하신 진료과는 {props.route.params.medicalDepartment}입니다.
      </Title>
    </Container>
  );
};

const Container = styled.SafeAreaView`
  background-color: ${props => props.theme.colors.white};
`;
const Title = styled.Text``;

export default HospitalListScreen;
