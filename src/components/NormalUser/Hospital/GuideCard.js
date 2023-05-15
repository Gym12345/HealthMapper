import React from 'react';
import {Dimensions} from 'react-native';

import styled from 'styled-components';
import {RFValue} from 'react-native-responsive-fontsize';

const {width} = Dimensions.get('window');
const GuideCard = props => {
  return (
    <Wrapper activeOpacity={0.5} onPress={props.onSelectGuide}>
      <MedicalDepartmentText>{props.medicalDepartment}</MedicalDepartmentText>
      <GuideText>{props.guide}</GuideText>
    </Wrapper>
  );
};

const Wrapper = styled.TouchableOpacity`
  background-color: ${props => props.theme.colors.gray8};
  margin-vertical: 15px;
  margin-horizontal: 7px;
  align-items: center;
  justify-content: center;
  padding-horizontal: 20px;
  padding-vertical: 10px;
  border-radius: 10px;
  border-color: ${props => props.theme.colors.gray7};
  border-width: 1px;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.4);
  elevation: 8;
  width: ${width / 1.15}px;
`;
const MedicalDepartmentText = styled.Text`
  font-size: ${RFValue(17)}px;
  font-weight: bold;
  color: ${props => props.theme.colors.patientColor};
  margin-bottom: 10px;
`;
const GuideText = styled.Text`
  text-align: center;
  font-size: ${RFValue(13)}px;
  color: ${props => props.theme.colors.gray2};
`;

export default GuideCard;
