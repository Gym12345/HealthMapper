import React, {useState} from 'react';
import {Dimensions} from 'react-native';

import styled from 'styled-components';

import Modal from 'react-native-modal';
import {Calendar, LocaleConfig} from 'react-native-calendars';

LocaleConfig.locales['kr'] = {
  monthNames: [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ],
  monthNamesShort: [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ],
  dayNames: ['일', '월', '화', '수', '목', '금', '토'],
  dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
};

LocaleConfig.defaultLocale = 'kr';

const {width} = Dimensions.get('window');

const HealthCalendarModal = props => {
  const [markedDates, setMarkedDates] = useState(); //선택된 날짜에 마커를 찍기 위한 변수
  return (
    <CalendarModal
      isVisible={props.isVisible}
      transparent={true}
      onBackdropPress={props.onBackdropPress}>
      <Calendar
        markedDates={markedDates}
        onDayPress={date => {
          console.log(date);
          setMarkedDates({[date.dateString]: {selected: true}}); //선택된 날짜에 마커
          props.setYear(date.year); //서버로 전달할 선택된 연도
          props.setMonth(date.month); //서버로 전달할 선택된 월
          props.setDay(date.day); //서버로 전달할 선택된 일
          props.setVisible(false); //날짜 선택하면 showModal false
        }}
        theme={{
          selectedDayBackgroundColor: '#F53874',
          arrowColor: 'black',
          dotColor: 'green',
          todayTextColor: 'black',
        }}
      />
    </CalendarModal>
  );
};
const CalendarModal = styled(Modal)`
  align-self: center;
  width: ${width - 50}px;
`;

export default HealthCalendarModal;
