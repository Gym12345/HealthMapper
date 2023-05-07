import React, {useState} from 'react';
import {Dimensions, Platform} from 'react-native';

import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components';

const {height} = Dimensions.get('window');
const HospitalInputForm = props => {
  return (
    <InputWrapper>
      <RowDirectionWrapper>
        <FormTitle>병원명{'    '}</FormTitle>
        <HospitalTitleInput
          value={props.isHospitalTitle}
          maxLength={20}
          placeholder="병원 이름을 입력해주세요"
          onChangeText={props.setIsHospitalName}
        />
      </RowDirectionWrapper>
      <RowDirectionWrapper>
        <FormTitle>병원 주소</FormTitle>
        <HospitalAddressInput
          value={props.isHospitalAddress}
          placeholder="병원 주소를 입력해주세요"
          onChangeText={props.setIsHospitalAddress}
        />
      </RowDirectionWrapper>
      <RowDirectionWrapper>
        <FormTitle>병원 URL</FormTitle>
        <HospitalDomainInput
          value={props.isHospitalDomain}
          placeholder="ex) www.gachon.co.kr"
          onChangeText={props.setIsHospitalDomain}
        />
      </RowDirectionWrapper>
      <RowDirectionWrapper>
        <FormTitle>병원 설명</FormTitle>
        <HospitalDescriptionWrapper>
          <HospitalDescriptionInput
            value={props.isHospitalDescription}
            placeholder="병원에 대한 설명을 입력해주세요"
            multiline={true}
            onChangeText={props.setIsHospitalDescription}
          />
        </HospitalDescriptionWrapper>
      </RowDirectionWrapper>
    </InputWrapper>
  );
};

const inputStyle = {
  height: Platform.OS === 'ios' ? 40 : 50,
  marginVertical: Platform.OS === 'ios' ? 5 : 0,
};

const InputWrapper = styled.View`
  border-color: ${props => props.theme.colors.gray5};
  border-width: 1px;
  margin-top: 10px;
  padding: 10px;
`;
const RowDirectionWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  border-bottom-width: 1px;
  border-color: ${props => props.theme.colors.gray5};
`;
const FormTitle = styled.Text`
  color: ${props => props.theme.colors.black};
  font-size: ${RFValue(13)}px;
  margin-right: 15px;
`;
const HospitalTitleInput = styled.TextInput`
  font-size: ${RFValue(13)}px;
  ${inputStyle}
`;
const HospitalAddressInput = styled.TextInput`
  font-size: ${RFValue(13)}px;
  ${inputStyle}
`;
const HospitalDomainInput = styled.TextInput`
  font-size: ${RFValue(13)}px;
  ${inputStyle}
`;
const HospitalDescriptionWrapper = styled.View`
  height: ${height / 10}px;
  justify-content: center;
`;

const HospitalDescriptionInput = styled.TextInput`
  font-size: ${RFValue(12)}px;
  ${inputStyle}
`;

export default HospitalInputForm;
