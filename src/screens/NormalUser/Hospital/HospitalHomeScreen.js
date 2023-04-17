import React, {useCallback} from 'react';
import {BackHandler, Dimensions} from 'react-native';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';

import {useFocusEffect} from '@react-navigation/native';

import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components';
import Icons from '../../../aseets/Icons';
import HeaderBar from '../../../components/Global/HeaderBar';

import RecommendationCard from '../../../components/NormalUser/Hospital/RecommendationCard';

const {height} = Dimensions.get('window');

const HospitalHomeScreen = props => {
  //바텀탭 높이 _ 스크롤뷰
  const bottomTabHeight = useBottomTabBarHeight();
  //뒤로가기 눌를 시 앱종료_안드로이드
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        BackHandler.exitApp();
        return true;
      };
      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, []),
  );
  return (
    <Container>
      <HeaderBar.centerOnly centerTitle="Health Mapper" />
      <ScrolleWrapper>
        <Wrapper bottomTabHeight={bottomTabHeight}>
          {/* 병원 추천이동 Wrapper */}
          <WrapperTitle firstWrapper>
            <HighlightText hosptial>병원을 추천</HighlightText>해드려요!
          </WrapperTitle>
          <RecommendationCard
            id="bodyPart"
            onPress={() => {
              props.navigation.navigate('bodyPart');
            }}
            cardTitle="신체부위"
            description={`아픈 신체부위를 선택해서 \n다양한 병원 찾기`}
            icon={<Icons.humanBody />}
          />
          <RecommendationCard
            id="medicalDepartment"
            onPress={() => {
              props.navigation.navigate('medicalDepartment');
            }}
            cardTitle="진료과"
            description={`진료과를 선택해서 \n다양한 병원 찾기 `}
            icon={<Icons.medicalDepartment />}
          />

          {/* 건강 기록이동 Wrapper */}
          <WrapperTitle secondeWrapper>
            <HighlightText health>건강을 기록</HighlightText>할 수 있어요!
          </WrapperTitle>
          <RecommendationCard
            id="health"
            onPress={() => {
              props.navigation.navigate('건강기록');
            }}
            cardTitle="건강기록"
            description={`나만의 건강 메모장`}
            icon={<Icons.healthMemo />}
          />
        </Wrapper>
      </ScrolleWrapper>
    </Container>
  );
};

const Container = styled.SafeAreaView`
  background-color: ${props => props.theme.colors.white};
`;
const ScrolleWrapper = styled.ScrollView``;
const Wrapper = styled.View`
  margin-bottom: ${props => props.bottomTabHeight}px;
  padding: 20px;
`;
const WrapperTitle = styled.Text`
  margin-top: ${props => (props.firstWrapper ? height / 84 : height / 21)}px;
  margin-left: 10px;
  font-weight: bold;
  font-size: ${RFValue(18)}px;
  color: ${props => props.theme.colors.gray3};
`;
const HighlightText = styled.Text`
  color: ${props =>
    props.hosptial
      ? props.theme.colors.patientColor
      : props.theme.colors.heartColor};
`;

export default HospitalHomeScreen;
