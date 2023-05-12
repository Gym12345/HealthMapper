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
        onDayPress={day => {
          console.log(day);
          const selectedDate = day.dateString; //선택된 날짜
          const formattedDate = new Date(selectedDate).toLocaleDateString(
            'ko-KR',
            {year: 'numeric', month: 'long', day: 'numeric'},
          ); //한국 날짜표기로 format
          console.log(formattedDate);
          props.setDate(formattedDate); //건강기록 스크린에서 선택된 날짜 전달
          setMarkedDates({[selectedDate]: {selected: true}}); //선택된 날짜에 마커
          props.setVisible(false); //날짜 선택하면 showModal false
        }}
        theme={{
          selectedDayBackgroundColor: '#885FFF',
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
