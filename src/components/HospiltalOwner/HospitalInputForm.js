import React from 'react';
import {Dimensions, Platform} from 'react-native';

import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components';

const {height, width} = Dimensions.get('window');
const HospitalInputForm = props => {
  return (
    <InputContainer>
      {/*병원 이름 wrapper */}
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
      </InputWrapper>
      {/*병원 주소 wrapper */}
      <InputWrapper>
        <RowDirectionWrapper isAddressWrapper={true}>
          <FormTitle>병원 주소</FormTitle>
          <FindAddressButton onPress={props.onPressFindAddress}>
            <ButtonText>병원 주소명 찾기</ButtonText>
          </FindAddressButton>
        </RowDirectionWrapper>
        <AddressWrapper>
          <HospitalAddressText value={props.isHospitalAddress}>
            {props.isHospitalAddress
              ? props.isHospitalAddress
              : '병원 주소명 찾기를 통해 주소를 선택해주세요'}
          </HospitalAddressText>
        </AddressWrapper>
      </InputWrapper>
      {/*병원 URL wrapper */}
      <InputWrapper>
        <RowDirectionWrapper>
          <FormTitle>병원 URL</FormTitle>
          <HospitalDomainInput
            value={props.isHospitalDomain}
            placeholder="ex) www.gachon.co.kr"
            onChangeText={props.setIsHospitalDomain}
          />
        </RowDirectionWrapper>
      </InputWrapper>
      {/*병원 설명 wrapper */}
      <InputWrapper>
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
    </InputContainer>
  );
};

const inputStyle = {
  height: Platform.OS === 'ios' ? 40 : 50,
  marginVertical: Platform.OS === 'ios' ? 5 : 0,
};

const InputContainer = styled.View`
  border-color: ${props => props.theme.colors.gray5};
  width: ${width - 30}px;
  border-width: 1px;
  margin-top: 10px;
  padding: 10px;
`;
const InputWrapper = styled.View`
  border-bottom-width: 1px;
  border-color: ${props => props.theme.colors.gray5};
`;
const RowDirectionWrapper = styled.View`
  margin-top: ${props => (props.isAddressWrapper ? '10px' : '0px')};
  flex-direction: row;
  align-items: center;
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
const AddressWrapper = styled.View``;
const HospitalAddressText = styled.Text`
  margin-vertical: 13px;
  font-size: ${RFValue(13)}px;
  color: ${props =>
    props.value ? props.theme.colors.black : props.theme.colors.gray4};
`;
const FindAddressButton = styled.TouchableOpacity`
  padding-horizontal: 20px;
  padding-vertical: 5px;
  align-self: center;
  border-radius: 15px;
  border-width: 2px;
  border-color: ${props => props.theme.colors.hospitalOwnerColor};
  align-items: center;
  margin-left: auto;
`;
const ButtonText = styled.Text`
  font-size: ${RFValue(13)}px;
  color: ${props => props.theme.colors.black};
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
`;

export default HospitalInputForm;
