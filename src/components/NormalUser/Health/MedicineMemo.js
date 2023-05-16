import React from 'react';
import {Dimensions} from 'react-native';

import styled from 'styled-components';
import {RFValue} from 'react-native-responsive-fontsize';

const {height, width} = Dimensions.get('window');

const MedicineMemo = props => {
  return (
    <MemoWrapper>
      <WrapperTitle>복용중인 약을 입력해주세요!</WrapperTitle>
      <InputWrapper>
        <MemoInput
          multiline={true}
          value={props.value}
          onChangeText={props.onChangeMedicine}
        />
      </InputWrapper>
    </MemoWrapper>
  );
};

const MemoWrapper = styled.View`
  padding: 10px;
  align-items: center;
`;
const WrapperTitle = styled.Text`
  color: ${props => props.theme.colors.black};
  font-size: ${RFValue(15)}px;
`;
const InputWrapper = styled.View`
  margin-top: 20px;
  border-width: 1px;
  border-color: ${props => props.theme.colors.black};
  height: ${height / 4}px;
  width: ${width - 70}px;
  padding: 10px;
`;
const MemoInput = styled.TextInput`
  flex: 1;
  font-size: ${RFValue(15)}px;
`;

export default MedicineMemo;
