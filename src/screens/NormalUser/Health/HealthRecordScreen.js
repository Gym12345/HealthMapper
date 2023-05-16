import React, {useEffect, useState} from 'react';

import {RFValue} from 'react-native-responsive-fontsize';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';

import HeaderBar from '../../../components/Global/HeaderBar';
import styled from 'styled-components';
import Icons from '../../../aseets/Global/Icons';
import Icons_health from '../../../aseets/Health/Icons';

import HealthCalendarModal from '../../../components/NormalUser/Health/HealthCalendarModal';
import HealthMemo from '../../../components/NormalUser/Health/HealthMemo';
import MedicineMemo from '../../../components/NormalUser/Health/MedicineMemo';

const HealthRecordScreen = props => {
  const [showModl, setShowModal] = useState(false);
  const [isSelectedDate, setSelectedDate] = useState(false);
  const [isMemo, setIsMemo] = useState(null); //메모 변수
  const [isMedicien, setIsMedicine] = useState(null); //약 변수
  const [isMemoIconActive, setIsMemoIconActive] = useState(null); //메모아이콘 활성화 변수
  const [isMedicineIconActive, setIsMedicineIconActive] = useState(null); //약아이콘 활성화 변수

  const bottomTabHeight = useBottomTabBarHeight();

  //reduxHandler로 대체
  const submitMemoHandler = () => {
    console.log(
      '현재일자:' + isSelectedDate,
      '건강관련 메모:' + isMemo + '약물 메모' + isMedicien,
    );
  };

  //스크린 최초 렌더링 시 현재 날짜를 isSelectedDate 변수에 저장
  useEffect(() => {
    const date = new Date();
    let currentYear = date.getFullYear();
    let currentMonth = date.getMonth() + 1;
    let currentDay = date.getDate();
    const todayDate = `${currentYear}년 ${
      currentMonth < 10 ? '0' : ''
    }${currentMonth}월 ${currentDay < 10 ? '0' : ''}${currentDay}일 `;
    setSelectedDate(todayDate);
  }, []);

  return (
    <Container>
      <HeaderBar.leftRightCenter
        leadingLeftAction={() => {
          props.navigation.goBack();
        }}
        leadingLeftIcon={<Icons.arrowBack />}
        centerTitle="건강기록"
        leadingRightAction={submitMemoHandler}
        buttonTitle="저장"
      />
      <DateButtonWrapper onPress={() => setShowModal(true)}>
        <CurrentDate>{isSelectedDate}</CurrentDate>
      </DateButtonWrapper>
      <DivisionLine />
      <IconContainer>
        <IconWrapper
          onPress={() => {
            setIsMemoIconActive(true);
            setIsMedicineIconActive(false);
          }}>
          <Icons_health.memo active={isMemoIconActive} />
        </IconWrapper>
        <IconWrapper
          onPress={() => {
            setIsMemoIconActive(false);
            setIsMedicineIconActive(true);
          }}>
          <Icons_health.medicine active={isMedicineIconActive} />
        </IconWrapper>
      </IconContainer>
      <DivisionLine />
      <ScrollWrapper>
        <MemoWrapper bottomTabHeight={bottomTabHeight}>
          {/*처음 렌더링(메모,약 아이콘 활성화 X)시 아무것도 렌더링 하지 않고 메모,약 아이콘 클릭 시 그에 맞는 컴포넌트 렌더링*/}
          {!isMemoIconActive &&
          !isMedicineIconActive ? null : isMemoIconActive ? (
            <HealthMemo
              value={isMemo}
              onChangeMemo={text => {
                setIsMemo(text);
              }}
            />
          ) : (
            <MedicineMemo
              value={isMedicien}
              onChangeMedicine={text => {
                setIsMedicine(text);
              }}
            />
          )}
        </MemoWrapper>
      </ScrollWrapper>

      <HealthCalendarModal
        isVisible={showModl}
        setVisible={setShowModal}
        setDate={setSelectedDate}
        onBackdropPress={() => setShowModal(false)}
      />
    </Container>
  );
};

const Container = styled.SafeAreaView`
  background-color: ${props => props.theme.colors.white};
`;
const SaveButton = styled.Text``;
const DateButtonWrapper = styled.TouchableOpacity`
  align-items: center;
  padding-vertical: 20px;
`;
const CurrentDate = styled.Text`
  font-size: ${RFValue(20)}px;
  color: ${props => props.theme.colors.black};
`;
const ScrollWrapper = styled.ScrollView``;
const MemoWrapper = styled.View`
  margin-bottom: ${props => props.bottomTabHeight + 100}px;
`;
const DivisionLine = styled.View`
  background-color: ${props => props.theme.colors.gray7};
  align-self: center;
  width: 100%;
  height: 1px;
`;
const IconContainer = styled.View`
  padding: 10px;
  flex-direction: row;
  justify-content: space-around;
`;
const IconWrapper = styled.TouchableOpacity``;

export default HealthRecordScreen;
