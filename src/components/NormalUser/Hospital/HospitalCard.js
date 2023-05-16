import React from 'react';
import {RFValue} from 'react-native-responsive-fontsize';

import styled from 'styled-components';

const HospitalCard = props => {
  return (
    <Wrapper activeOpacity={0.5} onPress={props.onSelectHospital}>
      <HospitalTitle>{props.hospitalName}</HospitalTitle>
      <Distance>{props.distance}km</Distance>
      <HospitalAddress>{props.hospitalAddress}</HospitalAddress>
      <HospitalDepartment>
        진료과목 - {props.hospitalDepartment}
      </HospitalDepartment>
    </Wrapper>
  );
};

const Wrapper = styled.TouchableOpacity`
  width: 90%;
  margin-vertical: 7px;
  align-self: center;
  background-color: ${props => props.theme.colors.gray8};
  padding: 15px;
  border-color: ${props => props.theme.colors.gray7};
  border-width: 1px;
  border-radius: 15px;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.4);
  elevation: 10;
`;
const HospitalTitle = styled.Text`
  font-weight: bold;
  font-size: ${RFValue(15)}px;
  color: ${props => props.theme.colors.patientColor};
`;
const Distance = styled.Text`
  font-size: ${RFValue(12)}px;
  color: ${props => props.theme.colors.gray3};
`;
const HospitalAddress = styled.Text`
  margin-top: 5px;
  font-size: ${RFValue(13)}px;
  color: ${props => props.theme.colors.black};
`;
const HospitalDepartment = styled.Text`
  margin-top: 5px;
  font-size: ${RFValue(11)}px;
  color: ${props => props.theme.colors.gray3};
`;

export default HospitalCard;
