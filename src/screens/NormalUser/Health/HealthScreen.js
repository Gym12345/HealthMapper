import React from 'react';

import HeaderBar from '../../../components/Global/HeaderBar';
import styled from 'styled-components';

const HealthScreen = props => {
  return (
    <Container>
      <HeaderBar.centerOnly centerTitle="건강 기록" />
      <Title>This is HealthScreen!</Title>
    </Container>
  );
};

const Container = styled.SafeAreaView`
  background-color: ${props => props.theme.colors.white};
`;
const Title = styled.Text``;

export default HealthScreen;
