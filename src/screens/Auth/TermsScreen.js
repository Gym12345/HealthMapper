//이용약관 스크린
import React from 'react';

import {Text} from 'react-native';

import styled from 'styled-components';
import HeaderBar from '../../components/Global/HeaderBar';
import Icons from '../../aseets/Global/Icons';

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
      {props.route.params.value === '개인정보취급방침' ? (
        <SubText>개인정보취급방침 이용약관에 대해....</SubText>
      ) : (
        <SubText>위치기반서비스 이용약관에 대해....</SubText>
      )}
    </Container>
  );
};

const Container = styled.SafeAreaView`
  background-color: ${props => props.theme.colors.white};
`;
const SubText = styled.Text``;

export default TermsScreen;
