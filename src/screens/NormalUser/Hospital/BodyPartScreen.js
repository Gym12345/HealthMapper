import React, {useState, useEffect, useCallback} from 'react';
import {Dimensions, Alert} from 'react-native';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';

import {useDispatch} from 'react-redux';
import {getHospitalList_bodyPart} from '../../../store/slices/hospitalSlice';

import styled from 'styled-components';

import Icons from '../../../aseets/Global/Icons';
import HeaderBar from '../../../components/Global/HeaderBar';

import BodyPart from '../../../components/NormalUser/Hospital/BodyPart';
import HeadPartModal from '../../../components/NormalUser/Hospital/HeadPartModal';

const {height} = Dimensions.get('window');

const BodyPartScreen = props => {
  //바텀탭 높이 _ 스크롤뷰
  const bottomTabHeight = useBottomTabBarHeight();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(false);

  //병원 리스트 조회 핸들러 (사용자가 선택한 신체부위를 신체부위 핸들러로 dispatch)
  const getHospitalListHandler = useCallback(
    async selectedPart => {
      setError(null);
      try {
        await dispatch(getHospitalList_bodyPart(selectedPart)).unwrap();
        props.navigation.navigate('hospitalList');
      } catch (error) {
        //예외처리
        setError(error.message);
      }
    },
    [dispatch],
  );

  //예외처리 알림문
  useEffect(() => {
    if (error) {
      Alert.alert('병원 불러오기 실패', error, [{text: '확인'}]);
    }
  }, [error]);

  return (
    <Container>
      <HeaderBar.leftCenter
        leadingAction={() => {
          props.navigation.goBack();
        }}
        leadingIcon={<Icons.arrowBack />}
        centerTitle="신체부위"
      />
      <Title>
        진료 받고싶은
        <HighlightText> 신체부위를 선택</HighlightText>해주세요!
      </Title>
      <ScrolleWrapper>
        <Wrapper bottomTabHeight={bottomTabHeight}>
          <BodyPart
            onBodyPartSelect={selectedPart => {
              selectedPart === '머리'
                ? setShowModal(true)
                : getHospitalListHandler(selectedPart);
            }}
          />
        </Wrapper>
      </ScrolleWrapper>
      <HeadPartModal
        isVisible={showModal}
        onModalCancel={() => setShowModal(false)}
        onBackdropPress={() => setShowModal(false)}
        onBodyPartSelect={selectedPart => {
          setShowModal(false);
          getHospitalListHandler(selectedPart);
        }}
      />
    </Container>
  );
};

const Container = styled.SafeAreaView`
  background-color: ${props => props.theme.colors.white};
`;
const Title = styled.Text`
  align-self: center;
  font-size: 15px;
  margin-top: ${height / 20}px;
  color: ${props => props.theme.colors.black};
`;

const HighlightText = styled.Text`
  font-weight: bold;
`;
const ScrolleWrapper = styled.ScrollView`
  margin-top: ${height / 20}px;
`;
const Wrapper = styled.View`
  margin-bottom: ${props => props.bottomTabHeight + 70}px;
`;

export default BodyPartScreen;
