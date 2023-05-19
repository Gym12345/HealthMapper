import React from 'react';
import {Dimensions} from 'react-native';

import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components';

const {height} = Dimensions.get('window');
const HealthRecordCard = props => {
  return (
    <CardWrapper onPress={props.onSelectHealthRecord}>
      <DateWrapper>
        <RecordYear>{props.recordYear}년</RecordYear>
        <RecordMonth>{props.recordMonth}월</RecordMonth>
        <RecordDay>{props.recordDay}일</RecordDay>
      </DateWrapper>
      <RecordMemo>{props.recordMemo}</RecordMemo>
    </CardWrapper>
  );
};

const CardWrapper = styled.TouchableOpacity`
  background-color: ${props => props.theme.colors.gray8};
  margin-vertical: ${height / 60}px;
  margin-horizontal: 20px;
  padding: ${height / 80}px;
  border-radius: 10px;
  border-color: ${props => props.theme.colors.gray7};
  border-width: 1px;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.4);
  elevation: 8;
`;
const DateWrapper = styled.View`
  flex-direction: row;
`;
const RecordYear = styled.Text`
  font-size: ${RFValue(17)}px;
  color: ${props => props.theme.colors.gray4};
`;
const RecordMonth = styled.Text`
  font-size: ${RFValue(17)}px;
  margin-left: 5px;
  color: ${props => props.theme.colors.gray4};
`;
const RecordDay = styled.Text`
  font-size: ${RFValue(17)}px;
  margin-left: 5px;
  color: ${props => props.theme.colors.gray4};
`;
const RecordMemo = styled.Text`
  margin-top: ${height / 80}px;
  font-size: ${RFValue(17)}px;
  color: ${props => props.theme.colors.gray3};
`;

export default HealthRecordCard;
