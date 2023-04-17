import React, {useState, useEffect, useCallback} from 'react';
import {Text} from 'react-native';

import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import Icons from '../../aseets/Icons';

const AgreeTermsButtons = props => {
  const [isPrivacyActive, setPrivacyActive] = useState(false);
  const [isLocationActive, setLocationActive] = useState(false);

  //전체동의 및 sub동의 관련성 유효성검사함수.
  //각각의 버튼상태가 바뀌면 계속 전체동의가 활성화가되는지 안되는지 체크.
  const checkAgreement = useCallback(() => {
    if (isPrivacyActive && isLocationActive) {
      props.setTotalActive(true);
    } else {
      props.setTotalActive(false);
    }
  }, [isPrivacyActive, isLocationActive]);
  useEffect(() => {
    checkAgreement();
  }, [checkAgreement]);

  //전체동의 버튼 toggle함수
  const toggleTotalActive = useCallback(() => {
    props.setTotalActive(!props.isTotalActive);
    setPrivacyActive(!props.isTotalActive);
    setLocationActive(!props.isTotalActive);
  }, [props.isTotalActive]);

  //개인정보취급방치 버튼 toggle함수
  const togglePrivacyActive = useCallback(() => {
    setPrivacyActive(!isPrivacyActive);
  }, [isPrivacyActive]);

  //위치기반서비스 버튼 toggle함수
  const toggleLocationActive = useCallback(() => {
    setLocationActive(!isLocationActive);
  }, [isLocationActive]);

  return (
    <Container>
      <AgreeWrapper>
        <IconWrapper onPress={toggleTotalActive}>
          {props.isTotalActive ? <Icons.checkbox /> : <Icons.emptyCheckbox />}
        </IconWrapper>
        <FullAgreeText>전체동의</FullAgreeText>
      </AgreeWrapper>
      <BottomWrapper>
        <AgreeWrapper>
          <IconWrapper onPress={togglePrivacyActive}>
            {isPrivacyActive ? <Icons.checkbox /> : <Icons.emptyCheckbox />}
          </IconWrapper>
          <TextButtonWrapper
            value="개인정보취급방침"
            onPress={() => {
              props.onPressTextButton('개인정보취급방침');
            }}>
            <SubAgreeText>개인정보취급방침</SubAgreeText>
            <Text>(필수)</Text>
          </TextButtonWrapper>
        </AgreeWrapper>
        <AgreeWrapper>
          <IconWrapper onPress={toggleLocationActive}>
            {isLocationActive ? <Icons.checkbox /> : <Icons.emptyCheckbox />}
          </IconWrapper>
          <TextButtonWrapper
            value="위치기반서비스 이용약관"
            onPress={() => {
              props.onPressTextButton('위치기반서비스 이용약관');
            }}>
            <SubAgreeText>위치기반서비스 이용약관</SubAgreeText>
            <Text>(필수)</Text>
          </TextButtonWrapper>
        </AgreeWrapper>
      </BottomWrapper>
    </Container>
  );
};

const Container = styled.View`
  margin-top: 20px;
`;
const AgreeWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;
const FullAgreeText = styled.Text`
  font-weight: bold;
  color: ${props => props.theme.colors.black};
  margin-left: 10px;
  font-size: ${RFValue(15)}px;
`;
const BottomWrapper = styled.View`
  background-color: ${props => props.theme.colors.gray7};
  padding: 10px;
  border-radius: 10px;
`;
const TextButtonWrapper = styled.TouchableOpacity`
  margin-left: 10px;
  flex-direction: row;
  margin-vertical: 3px;
`;
const IconWrapper = styled.TouchableOpacity``;
const SubAgreeText = styled.Text`
  color: ${props => props.theme.colors.gray2};
  text-decoration: underline;
  margin-right: 5px;
  font-size: ${RFValue(12)}px;
`;

export default AgreeTermsButtons;
