import React from 'react';
import {Dimensions} from 'react-native';

import styled from 'styled-components';

import {RFValue} from 'react-native-responsive-fontsize';

import StarRating from 'react-native-star-rating-widget';

const {height} = Dimensions.get('window');

const ReviewCard = props => {
  return (
    <CardWrapper>
      <RowDirectionWrapper>
        <UserIdText>{props.hiddenUserId}</UserIdText>
        <StarRating
          starStyle={{marginRight: -5}}
          starSize={props.starSize}
          enableHalfStar={false}
          rating={props.rating}
          enableSwiping={props.enableSwiping}
          onChange={props.onPressStart}
          color="#885FFF"
        />
      </RowDirectionWrapper>
      <CommentWrapper>
        <ReviewComment>{props.reviewComment}</ReviewComment>
      </CommentWrapper>
    </CardWrapper>
  );
};

const CardWrapper = styled.View`
  margin-top: ${height / 30}px;
  border-bottom-width: 2px;
  border-bottom-color: ${props => props.theme.colors.gray5};
`;
const RowDirectionWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;
const UserIdText = styled.Text`
  margin-right: 20px;
  font-size: ${RFValue(12)}px;
  color: ${props => props.theme.colors.gray3};
`;
const CommentWrapper = styled.View`
  margin-vertical: 5px;
`;
const ReviewComment = styled.Text`
  font-size: ${RFValue(14)}px;
  color: ${props => props.theme.colors.black};
`;

export default ReviewCard;
