import React from 'react';

import styled from 'styled-components';
import {RFValue} from 'react-native-responsive-fontsize';
import Icons from '../../aseets/Hospital/Icons';

const MyHospitalInfo = props => {
  return (
    <Wrapper>
      <RowDirectionButtonWrapper
        activeOpacity={0.5}
        onPress={props.onRegistHospital}>
        <Icons.hospitalRegist />
        <ButtonTitle>병원 등록하러 가기</ButtonTitle>
      </RowDirectionButtonWrapper>
      <RowDirectionButtonWrapper
        activeOpacity={0.5}
        onPress={props.onCheckHospital}>
        <Icons.myHospital />
        <ButtonTitle>내 병원</ButtonTitle>
      </RowDirectionButtonWrapper>
      <RowDirectionButtonWrapper
        activeOpacity={0.5}
        onPress={props.onCheckReview}>
        <Icons.myHospitalReview />
        <ButtonTitle>병원 리뷰 조회</ButtonTitle>
      </RowDirectionButtonWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.View`
  margin-horizontal: 30px;
`;
const RowDirectionButtonWrapper = styled.TouchableOpacity`
  margin-top: 30px;
  flex-direction: row;
  align-items: center;
`;
const ButtonTitle = styled.Text`
  font-size: ${RFValue(15)}px;
  color: ${props => props.theme.colors.black};
  margin-left: 20px;
`;

export default MyHospitalInfo;
