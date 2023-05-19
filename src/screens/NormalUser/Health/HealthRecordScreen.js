import React, {useState, useEffect, useCallback} from 'react';

import {Alert, Dimensions, FlatList} from 'react-native';

import {RFValue} from 'react-native-responsive-fontsize';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';

import {useDispatch, useSelector} from 'react-redux';
import {
  submitHealthRecord,
  getHealthRecord,
} from '../../../store/slices/healthSlice';

import HeaderBar from '../../../components/Global/HeaderBar';
import styled from 'styled-components';
import Icons from '../../../aseets/Global/Icons';

import HealthCalendarModal from '../../../components/NormalUser/Health/HealthCalendarModal';
import HealthMemo from '../../../components/NormalUser/Health/HealthMemo';
import MemoIconWrapper from '../../../components/NormalUser/Health/MemoIconWrapper';
import HealthRecordCard from '../../../components/NormalUser/Health/HealthRecordCard';

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
  const [isMemoIconActive, setIsMemoIconActive] = useState(false); //메모아이콘 활성화 변수
  const [isHomeIconActive, setIsHomeIconActive] = useState(true); //홈아이콘 활성화 변수
  const [isError, setError] = useState(null);
  const dispatch = useDispatch();
  const userId = useSelector(state => state.auth.userId);
  const healthRecordArr = useSelector(state => state.health.healthRecordArr);
  const isReviesGetted = useSelector(state => state.health.isReviesGetted);

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
        setIsMemo(''); //정상적으로 건강기록 저장 시 메모 초기화
        setSelectedYear(today.getFullYear().toString()); //정상적으로 건강기록 저장 시 현재 연도로 변경
        setSelectedMonth((today.getMonth() + 1).toString()); //정상적으로 건강기록 저장 시 현재 월로 변경
        setSelectedDay(today.getDate().toString()); //정상적으로 건강기록 저장 시 현재 일로 변경
        setIsHomeIconActive(true);
        setIsMemoIconActive(false);
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

  //건강 기록 조회 핸들러
  useEffect(() => {
    if (isHomeIconActive) {
      const getHealthRecordHandler = async () => {
        try {
          await dispatch(getHealthRecord({hcUser: userId})).unwrap();
        } catch (error) {
          console.log(error);
        }
      };
      getHealthRecordHandler();
      console.log('호출');
    }
  }, [dispatch, userId, isReviesGetted, isHomeIconActive]);

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

      {/* 아직 Icon 2개이기에 별도 함수로 관리 X -> 추후 아이콘(ex_약)추가된다면 함수관리가 유용 */}
      <MemoIconWrapper
        onHomeIconClick={() => {
          setIsHomeIconActive(true);
          setIsMemoIconActive(false);
        }}
        onMemoIconClick={() => {
          setIsHomeIconActive(false);
          setIsMemoIconActive(true);
        }}
        homeIconActive={isHomeIconActive}
        memoIconActive={isMemoIconActive}
      />
      <DivisionLine />

      <ScrollWrapper>
        <MemoWrapper bottomTabHeight={bottomTabHeight}>
          {/* 아직 Icon 2개이기에 삼항연산자로 -> 추후 아이콘(ex_약)추가된다면 focus가 유용할듯 */}
          {isHomeIconActive ? ( //홈 메모
            <FlatList
              data={healthRecordArr}
              keyExtractor={item => item.hcId.toString()}
              scrollEnabled={false}
              renderItem={item => (
                <HealthRecordCard
                  onSelectHealthRecord={() => {}}
                  recordYear={item.item.hcYear}
                  recordMonth={item.item.hcMonth}
                  recordDay={item.item.hcDate}
                  recordMemo={item.item.hcMemo}
                />
              )}
            />
          ) : (
            //건강 기록 메모
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

export default HealthRecordScreen;
