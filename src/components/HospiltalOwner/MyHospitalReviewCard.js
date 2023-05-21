import React from 'react';
import {Dimensions} from 'react-native';

import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components';
import StarRating from 'react-native-star-rating-widget';

//병원등록자의 병원 리뷰 컴포넌트
const {height} = Dimensions.get('window');
const MyHospitalReviewCard = props => {
  return (
    <CardWrapper>
      <UserName>{props.userName}</UserName>
      <StarRating
        starStyle={{marginRight: -7, marginTop: 5}}
        starSize={20}
        enableHalfStar={false}
        rating={props.rating}
        onChange={props.onPressStar}
        color="#4299AE"
      />
      <UserComment>{props.userComment}</UserComment>
    </CardWrapper>
  );
};

const CardWrapper = styled.View`
  background-color: ${props => props.theme.colors.gray8};
  margin-horizontal: 20px;
  margin-vertical: ${height / 60}px;
  padding: 10px;
  border-radius: 10px;
  border-color: ${props => props.theme.colors.gray7};
  border-width: 1px;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.4);
  elevation: 8;
`;
const UserName = styled.Text`
  font-size: ${RFValue(17)}px;
  font-weight: bold;
  color: ${props => props.theme.colors.black};
  margin-left: 7px;
`;
const UserComment = styled.Text`
  font-size: ${RFValue(13)}px;
  color: ${props => props.theme.colors.gray3};
  margin-top: 5px;
  margin-left: 7px;
  margin-right: 20px;
`;

export default MyHospitalReviewCard;
