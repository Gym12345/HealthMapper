import React from 'react';
import {Button, FlatList} from 'react-native';
import {useSelector} from 'react-redux';

import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import HeaderBar from '../../../components/Global/HeaderBar';
import styled from 'styled-components';
import Icons from '../../../aseets/Global/Icons';

import MyReviewCard from '../../../components/NormalUser/Info/MyReviewCard';

const MyReviewScreen = props => {
  const myReviewArr = useSelector(state => state.review.myReviewArr);
  const bottomTabHeight = useBottomTabBarHeight();

  return (
    <Container bottomTabHeight={bottomTabHeight}>
      <HeaderBar.leftCenter
        leadingAction={() => {
          props.navigation.goBack();
        }}
        leadingIcon={<Icons.arrowBack />}
        centerTitle="내가 남긴 리뷰"
      />
      <FlatList
        data={myReviewArr}
        keyExtractor={item => item.hrId}
        renderItem={itemData => (
          <MyReviewCard
            onPressMyReviewCard={() => {
              console.log(itemData.item);
            }}
            onPressStar={() => {
              console.log(itemData.item);
            }}
            hospitalName={itemData.item.hName}
            rating={itemData.item.hrRate}
            myComment={itemData.item.hrComment}
          />
        )}
      />
    </Container>
  );
};

const Container = styled.SafeAreaView`
  background-color: ${props => props.theme.colors.white};
  margin-bottom: ${props => props.bottomTabHeight - 10}px;
`;

export default MyReviewScreen;
