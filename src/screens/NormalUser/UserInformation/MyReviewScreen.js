import React, {useCallback} from 'react';
import {FlatList} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import {getHospitalByReview} from '../../../store/slices/reviewSlice';

import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import HeaderBar from '../../../components/Global/HeaderBar';
import styled from 'styled-components';
import Icons from '../../../aseets/Global/Icons';

import MyReviewCard from '../../../components/NormalUser/Info/MyReviewCard';

//내 리뷰 조회 화면
const MyReviewScreen = props => {
  const myReviewArr = useSelector(state => state.review.myReviewArr); //내가 남긴 리뷰 정보
  const bottomTabHeight = useBottomTabBarHeight();
  const dispatch = useDispatch();
  const hospitalArrByReview = useSelector(
    state => state.review.hospitalArrByReview,
  ); // 병원 상세 정보
  const isGettedHosByReview = useSelector(
    state => state.review.isGettedHosByReview,
  );

  const getHospitalByReviewHandler = useCallback(
    async selectedHospital => {
      try {
        await dispatch(getHospitalByReview({hName: selectedHospital.hName}));
        console.log(hospitalArrByReview);
        props.navigation.navigate('hospitalDetail', {
          selectedHospital: hospitalArrByReview[0],
        });
      } catch (error) {
        console.log(error);
      }
    },
    [dispatch, isGettedHosByReview, hospitalArrByReview],
  );

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
              getHospitalByReviewHandler(itemData.item);
            }}
            onPressStar={() => {}}
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
