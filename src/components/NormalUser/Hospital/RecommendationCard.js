import React from 'react';
import {Dimensions} from 'react-native';

import styled from 'styled-components';

const {height} = Dimensions.get('window');

const RecommendationCard = props => {
  console.log(height);
  console.log(height / 31);
  return (
    <CardWrapper id={props.id} activeOpacity={0.5} onPress={props.onPress}>
      <TextContainer>
        <CardTitle>{props.cardTitle}</CardTitle>
        <DescriptionText>{props.description}</DescriptionText>
      </TextContainer>
      {props.icon}
    </CardWrapper>
  );
};

const CardWrapper = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  padding: ${height / 42}px;
  margin-top: ${height / 31}px;
  background-color: ${props => props.theme.colors.gray8};
  border-radius: 20px;
  box-shadow: 1px 2px 2px rgba(0, 0, 0, 0.4);
  elevation: 10;
`;
const TextContainer = styled.View``;
const CardTitle = styled.Text`
  font-weight: bold;
  color: ${props => props.theme.colors.black};
  font-size: 18px;
`;
const DescriptionText = styled.Text`
  margin-top: ${height / 84}px;
  font-size: 13px;
  color: ${props => props.theme.colors.gray3};
`;

export default RecommendationCard;
