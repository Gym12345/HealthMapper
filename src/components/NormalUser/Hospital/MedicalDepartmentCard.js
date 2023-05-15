import React from 'react';
import {Dimensions} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';

import styled from 'styled-components';

const {width} = Dimensions.get('window');

const MedicalDepartmentCard = props => {
  return (
    <Wrapper activeOpacity={0.5} onPress={props.onPressDepartment}>
      {props.departmentIcon}
      <MedicalText>{props.medicalDepartment}</MedicalText>
    </Wrapper>
  );
};

const Wrapper = styled.TouchableOpacity`
  background-color: ${props => props.theme.colors.gray8};
  margin-vertical: 10px;
  margin-horizontal: 7px;
  align-items: center;
  justify-content: center;
  padding: 20px;
  border-radius: 10px;
  border-color: ${props => props.theme.colors.gray7};
  border-width: 1px;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.4);
  elevation: 8;
  width: ${width / 3 - 20}px;
`;
const MedicalText = styled.Text`
  text-align: center;
  margin-top: 5px;
  font-size: ${RFValue(13)}px;
  color: ${props => props.theme.colors.black};
`;

export default MedicalDepartmentCard;
