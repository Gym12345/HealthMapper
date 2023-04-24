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
        centerTitle="병원 리스트"
      />
      <Title>선택하신 것은 {props.route.params.selectedPart}입니다.</Title>
    </Container>
  );
};

const Container = styled.SafeAreaView`
  background-color: ${props => props.theme.colors.white};
`;
const Title = styled.Text``;

export default HospitalListScreen;
