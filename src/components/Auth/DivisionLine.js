import React from 'react';
import {Dimensions} from 'react-native';

import styled from 'styled-components';

const {width} = Dimensions.get('window');

const DivisionLine = props => {
  return (
    <Wrapper>
      <DividingLine />
      <DivisionText>{props.DivisionText}</DivisionText>
      <DividingLine />
    </Wrapper>
  );
};

const Wrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  margin-top: 10px;
`;

const DivisionText = styled.Text`
  color: ${props => props.theme.colors.gray3};
`;
const DividingLine = styled.View`
  height: 2px;
  width: ${width / 2 - 30}px;
  background-color: ${props => props.theme.colors.gray6};
`;

export default DivisionLine;
