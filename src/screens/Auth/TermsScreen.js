//이용약관 스크린
import React from 'react';

import {Text} from 'react-native';

import styled from 'styled-components';
import HeaderBar from '../../components/Global/HeaderBar';

const TermsScreen = props => {
  return (
    <Container>
      <HeaderBar.leftCenter
        leadingAction={() => {
          props.navigation.goBack();
        }}
        leadingIcon={<Icons.arrowBack />}
        centerTitle={props.route.params.value}
      />
    </Container>
  );
};

const Container = styled.SafeAreaView`
  background-color: ${props => props.theme.colors.white};
`;

export default TermsScreen;
