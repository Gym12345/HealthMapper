import React from 'react';
import {Dimensions} from 'react-native';

import Modal from 'react-native-modal';

import styled from 'styled-components';
import {RFValue} from 'react-native-responsive-fontsize';

const {height, width} = Dimensions.get('window');

const EditMemoModal = props => {
  return (
    <Modal
      isVisible={props.isVisible}
      transparent={true}
      onBackdropPress={props.onBackdropPress}>
      <MemoWrapper>
        <SelectedDate>
          {props.selectedYear}년 {props.selectedMonth}월 {props.selectedDay}일
        </SelectedDate>
        <InputWrapper>
          <MemoInput
            multiline={true}
            value={props.memoValue}
            onChangeText={props.onChangeMemoInput}
          />
        </InputWrapper>

        <EditButtonWrapper onPress={props.onEditMemo}>
          <EditButtonText>기록 수정</EditButtonText>
        </EditButtonWrapper>
      </MemoWrapper>
    </Modal>
  );
};

const MemoWrapper = styled.View`
  padding-horizontal: 10px;
  padding-top: 30px;
  padding-bottom: 10px;
  background-color: ${props => props.theme.colors.gray8};
  border-radius: 10px;
`;
const SelectedDate = styled.Text`
  color: ${props => props.theme.colors.gray4};
  font-size: ${RFValue(17)}px;
`;
const InputWrapper = styled.View`
  margin-top: 10px;
  height: ${height / 6}px;
  width: ${width - 70}px;
`;
const MemoInput = styled.TextInput`
  font-size: ${RFValue(15)}px;
`;

const EditButtonWrapper = styled.TouchableOpacity`
  margin-horizontal: 10px;
  border-radius: 10px;
  align-items: center;
  background-color: ${props => props.theme.colors.heartColor};
  padding-vertical: ${height / 50}px;
`;
const EditButtonText = styled.Text`
  font-size: ${RFValue(15)}px;
  font-weight: bold;
  color: ${props => props.theme.colors.gray7};
`;

export default EditMemoModal;
