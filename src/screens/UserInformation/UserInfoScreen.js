import React from 'react';

import HeaderBar from '../../components/Global/HeaderBar';
import styled from 'styled-components';

const UserInfoScreen = props => {
  return (
    <Container>
      <HeaderBar.leftCenter
        leadingAction={() => {
          props.navigation.goBack();
        }}
        leadingIcon={<Icons.arrowBack />}
        centerTitle="사용자 정보"
      />
      <Title>마이 스크린!</Title>
    </Container>
  );
};

const Container = styled.SafeAreaView`
  background-color: ${props => props.theme.colors.white};
`;
const Title = styled.Text``;

export default UserInfoScreen;
