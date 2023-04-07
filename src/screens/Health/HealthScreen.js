import React from 'react';

import HeaderBar from '../../components/Global/HeaderBar';
import styled from 'styled-components';

const HealthScreen = props => {
  return (
    <Container>
      <HeaderBar.leftCenter
        leadingAction={() => {
          props.navigation.goBack();
        }}
        leadingIcon={<Icons.arrowBack />}
        centerTitle="건강기록스크린"
      />
      <Title>This is HealthScreen!</Title>
    </Container>
  );
};

const Container = styled.SafeAreaView`
  background-color: ${props => props.theme.colors.white};
`;
const Title = styled.Text``;

export default HealthScreen;
