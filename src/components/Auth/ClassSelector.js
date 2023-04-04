import React, {useState, useCallback} from 'react';
import {Dimensions} from 'react-native';

import styled from 'styled-components';
import Icons from '../../aseets/Icons';

const {height} = Dimensions.get('window');

const ClassSelector = props => {
  const [isPatientSelect, setPatientSelect] = useState(false);
  const [isHospitalSelect, setHospitalSelect] = useState(false);

  const handlePatientSelect = useCallback(() => {
    setPatientSelect(!isPatientSelect);
    setHospitalSelect(false);
    props.setSelectedValue('normalUser');
  }, [isPatientSelect, isHospitalSelect]);

  const handleHospitalSelect = useCallback(() => {
    setHospitalSelect(!isHospitalSelect);
    setPatientSelect(false);
    props.setSelectedValue('hospitalOwner');
  }, [isPatientSelect, isHospitalSelect]);

  return (
    <FormWrapper>
      <ButtonWrapper activeOpacity={0.5} onPress={handlePatientSelect}>
        {isPatientSelect ? <Icons.checkbox /> : <Icons.emptyCheckbox />}
        <ButtonText active={isPatientSelect}>일반사용자(환자)</ButtonText>
      </ButtonWrapper>
      <ButtonWrapper activeOpacity={0.5} onPress={handleHospitalSelect}>
        {isHospitalSelect ? <Icons.checkbox /> : <Icons.emptyCheckbox />}
        <ButtonText active={isHospitalSelect}>병원소유자</ButtonText>
      </ButtonWrapper>
    </FormWrapper>
  );
};

const FormWrapper = styled.View`
  margin-top: ${height / 30}px;
  align-items: center;
  flex-direction: row;
  padding: 10px;
  height: 40px;
`;
const ButtonWrapper = styled.TouchableOpacity`
  margin-horizontal: 20px;
  flex-direction: row;
  align-items: center;
`;
const ButtonText = styled.Text`
  color: ${props =>
    props.active ? props.theme.colors.patientColor : props.theme.colors.gray3};
  margin-horizontal: 5px;
  font-size: 17px;
`;

export default ClassSelector;
