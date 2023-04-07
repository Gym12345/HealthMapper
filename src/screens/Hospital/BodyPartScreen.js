import React from 'react';

import styled from 'styled-components';

import Icons from '../../aseets/Icons';
import HeaderBar from '../../components/Global/HeaderBar';

const BodyPartScreen = props => {
  return (
    <Container>
      <HeaderBar.leftCenter
        leadingAction={() => {
          props.navigation.goBack();
        }}
        leadingIcon={<Icons.arrowBack />}
        centerTitle="신체부위"
      />
      <TestText>신체부위 선택 스크린.</TestText>
    </Container>
  );
};

const Container = styled.SafeAreaView`
  background-color: ${props => props.theme.colors.white};
`;
const TestText = styled.Text``;

export default BodyPartScreen;
