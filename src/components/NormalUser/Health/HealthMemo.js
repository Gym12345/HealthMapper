import React from 'react';
import {Dimensions} from 'react-native';

import styled from 'styled-components';
import {RFValue} from 'react-native-responsive-fontsize';

const {height, width} = Dimensions.get('window');

const HealthMemo = props => {
  return (
    <MemoWrapper>
      <WrapperTitle>메모</WrapperTitle>
      <InputWrapper>
        <MemoInput
          placeholder={props.placeholder}
          multiline={true}
          value={props.value}
          onChangeText={props.onChangeMemo}
        />
      </InputWrapper>

      <SubmitButton onPress={props.onSubmitMemo}>
        <ButtonText>저장하기</ButtonText>
      </SubmitButton>
    </MemoWrapper>
  );
};

const MemoWrapper = styled.View`
  padding-horizontal: 10px;
  padding-top: 30px;
  padding-bottom: 10px;
  background-color: ${props => props.theme.colors.gray8};
  margin: 20px;
  border-radius: 10px;
  border-color: ${props => props.theme.colors.gray7};
  border-width: 1px;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.4);
  elevation: 8;
`;
const WrapperTitle = styled.Text`
  color: ${props => props.theme.colors.black};
  font-weight: bold;
  font-size: ${RFValue(20)}px;
`;
const InputWrapper = styled.View`
  margin-top: 10px;
  height: ${height / 6}px;
  width: ${width - 70}px;
`;
const MemoInput = styled.TextInput`
  font-size: ${RFValue(15)}px;
`;

const SubmitButton = styled.TouchableOpacity`
  margin-top: 20px;
  margin-horizontal: 10px;
  border-radius: 10px;
  align-items: center;
  background-color: ${props => props.theme.colors.heartColor};
  padding-vertical: ${height / 50}px;
`;
const ButtonText = styled.Text`
  font-size: ${RFValue(15)}px;
  color: ${props => props.theme.colors.gray7};
`;

export default HealthMemo;
