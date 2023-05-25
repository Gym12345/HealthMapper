import React from 'react';

import {Dimensions} from 'react-native';

import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components';
import HeaderBar from '../../components/Global/HeaderBar';
import Icons from '../../aseets/Global/Icons';

const {height} = Dimensions.get('window');
const TermsScreen = props => {
  return (
    <Container>
      <HeaderBar.leftCenter
        leadingAction={() => {
          props.navigation.goBack();
        }}
        leadingIcon={<Icons.arrowBack />}
        centerTitle={props.route.params.value}
      />
      {props.route.params.value === '개인정보처리방침' ? (
        <TermsWrapper>
          <TermsTitle>개인정보처리방침</TermsTitle>
          <DivisionLine />
          <TermsText>
            "HealthMapper"는 사용자의 개인정보보호를 매우 중요시하고{'\n'}서비스
            제공 목적으로만 사용합니다.
          </TermsText>
          <SubTitle>개인정보의 처리 목적</SubTitle>
          <SubText>
            "HealthMapper"는 서비스 이용에 반드시 필요한 개인정보를 다음과 같은
            목적을 위하여 처리합니다. 사용자들의 건강기록을 수집하여
            사용자들에게 건강관리 서비스를 제공하고 사용자들의 위치 정보를 수집
            및 이용하여 사용자들에게 맞춤형 병원 추천 서비스를 제공하기 위해
            개인정보를 처리합니다.
          </SubText>
          <SubTitle>개인정보의 처리 및 보유 기간</SubTitle>
          <SubText>
            "HealthMapper"는 서비스 이용이 종료되거나 사용자가 동의 철회를
            요청할 경우에는 즉시 파기합니다.
          </SubText>
          <SubTitle>개인정보 제공 및 위탁</SubTitle>
          <SubText>
            "HealthMapper"는 사용자들의 개인정보를 본인의 동의 없이 타 기관 및
            업체에 제공하거나 위탁하지 않습니다.
          </SubText>
          <SubTitle>정보주체의 권리, 의무 및 그 행사 방법</SubTitle>
          <SubText>
            "HealthMapper"는 사용자가 언제든지 자신의 개인정보를 조회하거나
            수정할 수 있으며, 개인정보 처리에 대한 동의 철회를 요청할 수
            있습니다.
          </SubText>
          <SubTitle>기타</SubTitle>
          <SubText style={{marginBottom: 50}}>
            본 약관에 명시되지 않은 사항은 관련 법령 및 서비스 제공자의 지침에
            따릅니다.
          </SubText>
        </TermsWrapper>
      ) : (
        <TermsWrapper>
          <TermsTitle>위치기반 서비스 이용약관</TermsTitle>
          <DivisionLine />
          <TermsText>
            본 약관은 위치기반 서비스를 제공함에 있어, 사용자와 서비스
            제공자간의 권리와 의무 및 책임사항을 규정함을 목적으로 합니다.
          </TermsText>
          <SubTitle>서비스의 내용</SubTitle>
          <SubText>
            서비스는 위치정보를 이용한 병원 추천 서비스를 제공합니다. 서비스를
            이용하기 위해서는 이용자의 위치정보 제공에 대한 동의가 필요하며
            위치정보 이용에 관한 자세한 내용은 위치정보의 이용 및 제공을
            참고하시기 바랍니다.
          </SubText>
          <SubTitle>위치정보의 이용 및 제공</SubTitle>
          <SubText>
            서비스는 위치정보 이용 및 제공에 대한 동의를 받은 경우에만 이용이
            가능하며 위치정보는 이용자의 개인정보로서 안전하게 처리됩니다.
            위치정보는 사용자가 직접 입력한 정보 및 사용자의 기기 및 센서 등을
            통해 수집될 수 있으며 서비스 이용의 목적에 따라 사용자의 위치정보가
            제공될 수 있습니다.
          </SubText>
          <SubTitle>기타</SubTitle>
          <SubText>
            본 약관에 명시되지 않은 사항은 관련 법령 및 서비스 제공자의 지침에
            따릅니다.
          </SubText>
          <SubTitle>출처</SubTitle>
          <SubText>
            본 서비스는 경기데이터드림의 경기도 병원 현황 데이터를 기반해 맞춤형
            병원을 추천해드립니다.
          </SubText>
        </TermsWrapper>
      )}
    </Container>
  );
};

const Container = styled.SafeAreaView`
  background-color: ${props => props.theme.colors.white};
  flex: 1;
`;
const TermsWrapper = styled.ScrollView`
  flex: 1;
  padding: 20px;
`;
const TermsTitle = styled.Text`
  margin-top: ${height / 30}px;
  font-size: ${RFValue(18)}px;
  font-weight: bold;
  color: ${props => props.theme.colors.black};
`;

const DivisionLine = styled.View`
  margin-top: ${height / 30}px;
  background-color: ${props => props.theme.colors.gray4};
  align-self: center;
  width: 100%;
  height: 2px;
`;
const TermsText = styled.Text`
  margin-top: ${height / 30}px;
  font-size: ${RFValue(12)}px;
  color: ${props => props.theme.colors.gray3};
`;
const SubTitle = styled.Text`
  margin-top: ${height / 20}px;
  font-size: ${RFValue(14)}px;
  font-weight: bold;
  color: ${props => props.theme.colors.gray2};
`;
const SubText = styled.Text`
  margin-top: ${height / 50}px;
  font-size: ${RFValue(12)}px;
  color: ${props => props.theme.colors.gray3};
`;

export default TermsScreen;
