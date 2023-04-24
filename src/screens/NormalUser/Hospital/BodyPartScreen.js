import React, {useState} from 'react';
import {Dimensions, View, Text} from 'react-native';
import Modal from 'react-native-modal';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';

import styled from 'styled-components';

import Icons from '../../../aseets/Global/Icons';
import HeaderBar from '../../../components/Global/HeaderBar';

import BodyPart from '../../../components/NormalUser/Hospital/BodyPart';
import HeadPartModal from '../../../components/NormalUser/Hospital/HeadPartModal';

const {height} = Dimensions.get('window');

const BodyPartScreen = props => {
  //바텀탭 높이 _ 스크롤뷰
  const bottomTabHeight = useBottomTabBarHeight();
  const [showModal, setShowModal] = useState(false);

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
            onBodyPartSelect={selectedValue => {
              selectedValue === '머리'
                ? setShowModal(true)
                : props.navigation.navigate('hospitalList', {
                    selectedPart: selectedValue,
                  });
            }}
          />
        </Wrapper>
      </ScrolleWrapper>
      <HeadPartModal
        isVisible={showModal}
        onModalCancel={() => setShowModal(false)}
        onBackdropPress={() => setShowModal(false)}
        onBodyPartSelect={selectedValue => {
          setShowModal(false);
          props.navigation.navigate('hospitalList', {
            selectedPart: selectedValue,
          });
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
const ModalContainer = styled.View`
  background-color: ${props => props.theme.colors.white};
`;

export default BodyPartScreen;
