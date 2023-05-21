import React from 'react';
import {FlatList} from 'react-native';
import {useSelector} from 'react-redux';

import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {RFValue} from 'react-native-responsive-fontsize';

import HeaderBar from '../../../components/Global/HeaderBar';
import styled from 'styled-components';
import Icons from '../../../aseets/Global/Icons';

import MyHospitalReviewCard from '../../../components/HospiltalOwner/MyHospitalReviewCard';

//병원등록자의 병원 리뷰 화면
const MyHospitalReviewScreen = props => {
  const bottomTabHeight = useBottomTabBarHeight();
  const userId = useSelector(state => state.auth.userId);
  const myHospitalReview = useSelector(state => state.review.myHospitalReview);

  return (
    <Container bottomTabHeight={bottomTabHeight}>
      <HeaderBar.leftCenter
        leadingAction={() => {
          props.navigation.goBack();
        }}
        leadingIcon={<Icons.arrowBack />}
        centerTitle={`${userId}님의 병원 리뷰`}
      />
      {myHospitalReview.length === 0 ? (
        //등록된 리뷰가 없을 시의 예외처리
        <AlertText>아직 등록된 리뷰가 없어요...</AlertText>
      ) : (
        <FlatList
          data={myHospitalReview}
          keyExtractor={item => item.hrId}
          renderItem={itemData => (
            <MyHospitalReviewCard
              onPressStar={() => {}}
              userName={itemData.item.userId}
              rating={itemData.item.hrRate}
              userComment={itemData.item.hrComment}
            />
          )}
        />
      )}
    </Container>
  );
};

const Container = styled.SafeAreaView`
  background-color: ${props => props.theme.colors.white};
  margin-bottom: ${props => props.bottomTabHeight - 10}px;
`;
const AlertText = styled.Text`
  text-align: center;
  justify-content: center;
  font-size: ${RFValue(20)}px;
  color: ${props => props.theme.colors.black};
  margin-top: 50px;
`;

export default MyHospitalReviewScreen;
