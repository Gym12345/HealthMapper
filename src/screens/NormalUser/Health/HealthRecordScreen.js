import React, {useState, useCallback} from 'react';

import {Alert, Dimensions} from 'react-native';

import {RFValue} from 'react-native-responsive-fontsize';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';

import {useDispatch, useSelector} from 'react-redux';
import {submitHealthRecord} from '../../../store/slices/healthSlice';

import HeaderBar from '../../../components/Global/HeaderBar';
import styled from 'styled-components';
import Icons from '../../../aseets/Global/Icons';
import Icons_health from '../../../aseets/Health/Icons';

import HealthCalendarModal from '../../../components/NormalUser/Health/HealthCalendarModal';
import HealthMemo from '../../../components/NormalUser/Health/HealthMemo';

const {height} = Dimensions.get('window');

const HealthRecordScreen = props => {
  const today = new Date();
  const [showModl, setShowModal] = useState(false);
  const [isSelectedYear, setSelectedYear] = useState(
    today.getFullYear().toString(),
  );
  const [isSelectedMonth, setSelectedMonth] = useState(
    (today.getMonth() + 1).toString(),
  );
  const [isSelectedDay, setSelectedDay] = useState(today.getDate().toString());
  const [isMemo, setIsMemo] = useState(null); //메모 변수
  const [isMemoIconActive, setIsMemoIconActive] = useState(true); //메모아이콘 활성화 변수
  const [isError, setError] = useState(null);
  const dispatch = useDispatch();
  const userId = useSelector(state => state.auth.userId);

  const bottomTabHeight = useBottomTabBarHeight();

  //건강 기록 저장 핸들러
  const submitHealthRecordHandler = useCallback(
    async () => {
      setError(null);
      try {
        await dispatch(
          submitHealthRecord({
            hcYear: isSelectedYear, //현재 연도(초기값) or 선택된 연도
            hcMonth: isSelectedMonth, //현재 월(초기값) or 선택된 월
            hcDate: isSelectedDay, //현재 일(초기값) or 선택된 일
            hcMemo: isMemo, //건강기록 관련 메모
            hcUser: userId, //현재 로그인한 userId
          }),
        ).unwrap();
        props.navigation.navigate('내 정보'); //정상적으로 건강기록 저장 시 내 정보 화면으로 이동 (추후 내정보가 아닌 내건강기록조회Screen안내가 더 좋을지도)
        setIsMemo(''); //정상적으로 건강기록 저장 시 메모 초기화
        setSelectedYear(today.getFullYear().toString()); //정상적으로 건강기록 저장 시 현재 연도로 변경
        setSelectedMonth((today.getMonth() + 1).toString()); //정상적으로 건강기록 저장 시 현재 월로 변경
        setSelectedDay(today.getDate().toString()); //정상적으로 건강기록 저장 시 현재 일로 변경
      } catch (error) {
        setError(error.message);
        Alert.alert('저장 실패', '메모가 비어있습니다', [
          {text: '확인', style: 'cancel'},
        ]);
      }
    },
    // showModal, isMemo를 의존성 배열에 전달하면서 건강기록 저장 시 state변수둘 갱신
    [dispatch, isError, showModl, isMemo],
  );

  return (
    <Container>
      <HeaderBar.leftRightCenter
        leadingLeftAction={() => {
          props.navigation.goBack();
        }}
        leadingLeftIcon={<Icons.arrowBack />}
        centerTitle="건강기록"
        leadingRightAction={submitHealthRecordHandler}
        buttonTitle="저장"
      />
      <DateButtonWrapper onPress={() => setShowModal(true)}>
        <CurrentDate>
          {isSelectedYear}년 {isSelectedMonth}월 {isSelectedDay}일
        </CurrentDate>
      </DateButtonWrapper>
      <DivisionLine />

      <IconContainer>
        <IconWrapper
          onPress={() => {
            setIsMemoIconActive(true);
          }}>
          <Icons_health.memo active={isMemoIconActive} />
        </IconWrapper>
      </IconContainer>
      <DivisionLine />

      <ScrollWrapper>
        <MemoWrapper bottomTabHeight={bottomTabHeight}>
          {/*처음 렌더링(메모,약 아이콘 활성화 X)시 아무것도 렌더링 하지 않고 메모,약 아이콘 클릭 시 그에 맞는 컴포넌트 렌더링*/}
          {!isMemoIconActive ? null : (
            <HealthMemo
              value={isMemo}
              placeholder="건강을 기록해주세요"
              onSubmitMemo={submitHealthRecordHandler}
              onChangeMemo={text => {
                setIsMemo(text);
              }}
            />
          )}
        </MemoWrapper>
      </ScrollWrapper>

      <HealthCalendarModal
        isVisible={showModl}
        setVisible={setShowModal}
        setYear={setSelectedYear}
        setMonth={setSelectedMonth}
        setDay={setSelectedDay}
        onBackdropPress={() => setShowModal(false)}
      />
    </Container>
  );
};

const Container = styled.SafeAreaView`
  background-color: ${props => props.theme.colors.white};
`;
const DateButtonWrapper = styled.TouchableOpacity`
  align-items: center;
  padding-vertical: 20px;
`;
const CurrentDate = styled.Text`
  font-size: ${RFValue(20)}px;
  color: ${props => props.theme.colors.black};
`;
const ScrollWrapper = styled.ScrollView``;
const MemoWrapper = styled.View``;
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
