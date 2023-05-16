import React from 'react';
import {Dimensions} from 'react-native';

import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components';

const {width} = Dimensions.get('window');
const PartCard = props => {
  return (
    <Wrapper
      totalValue={props.totalValue}
      active={props.cardActive}
      onPress={props.onSelect}>
      <PartText active={props.cardActive}>{props.part}</PartText>
    </Wrapper>
  );
};

const Wrapper = styled.TouchableOpacity`
  background-color: ${props =>
    props.active
      ? props.theme.colors.hospitalOwnerColor
      : props.theme.colors.gray8};
  margin-vertical: 10px;
  margin-horizontal: 7px;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border-radius: 30px;
  border-color: ${props =>
    props.active
      ? props.theme.colors.hospitalOwnerColor
      : props.theme.colors.gray7};
  border-width: 1px;
  width: ${width / 4}px;
`;
const PartText = styled.Text`
  text-align: center;
  font-size: ${RFValue(13)}px;
  font-weight: ${props => (props.active ? 'bold' : 'normal')};
  color: ${props =>
    props.active ? props.theme.colors.white : props.theme.colors.gray4};
`;

export default PartCard;
