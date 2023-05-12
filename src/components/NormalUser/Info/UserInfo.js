import React from 'react';

import styled from 'styled-components';
import {RFValue} from 'react-native-responsive-fontsize';
import Icons from '../../../aseets/Health/Icons';

const UserInfo = props => {
  return (
    <Wrapper>
      <RowDirectionButtonWrapper
        activeOpacity={0.5}
        onPress={props.onCheckHealthMemo}>
        <Icons.myHealthMemo />
        <ButtonTitle>내 건강기록</ButtonTitle>
      </RowDirectionButtonWrapper>
      <RowDirectionButtonWrapper
        activeOpacity={0.5}
        onPress={props.onCheckMyReview}>
        <Icons.myReview />
        <ButtonTitle>내 리뷰 조회</ButtonTitle>
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

export default UserInfo;
