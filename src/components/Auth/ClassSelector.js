import React, {useState, useCallback} from 'react';

import styled from 'styled-components';
import Icons from '../../aseets/Icons';

const ClassSelector = props => {
  const [isPatientSelect, setPatientSelect] = useState(false);
  const [isHospitalSelect, setHospitalSelect] = useState(false);

  const handlePatientSelect = useCallback(() => {
    setPatientSelect(!isPatientSelect);
    setHospitalSelect(false);
    if (props.isSelectedValue === 'normalUser') {
      props.setSelectedValue('');
    } else {
      props.setSelectedValue('normalUser');
    }
  }, [isPatientSelect, isHospitalSelect, props.isSelectedValue]);

  const handleHospitalSelect = useCallback(() => {
    setHospitalSelect(!isHospitalSelect);
    setPatientSelect(false);
    if (props.isSelectedValue === 'hospitalOwner') {
      props.setSelectedValue('');
    } else {
      props.setSelectedValue('hospitalOwner');
    }
  }, [isPatientSelect, isHospitalSelect, props.isSelectedValue]);

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
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;
const ButtonWrapper = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin-horizontal: 10px;
`;
const ButtonText = styled.Text`
  color: ${props =>
    props.active ? props.theme.colors.patientColor : props.theme.colors.gray3};
  font-size: 18px;
  margin-left: 3px;
`;

export default ClassSelector;
