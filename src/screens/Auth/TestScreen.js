import React from 'react';

import styled from 'styled-components';

import Icons from '../../aseets/Icons';
import HeaderBar from '../../components/Global/HeaderBar';

const HomeScreen = props => {
  return (
    <Container>
      <HeaderBar.leftCenter
        leadingAction={() => {
          props.navigation.goBack();
        }}
        leadingIcon={<Icons.arrowBack />}
        centerTitle="Home(Test)Screen"
      />
      <TestText>
        현재 입력한 계정의 ID는 {props.route.params.userId}입니다.
      </TestText>
    </Container>
  );
};

const Container = styled.SafeAreaView``;
const TestText = styled.Text`
  color: ${props => props.theme.colors.patientColor};
  font-size: 40px;
`;

export default HomeScreen;
