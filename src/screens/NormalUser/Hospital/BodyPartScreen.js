import React, {useState} from 'react';
import {Dimensions, View} from 'react-native';

import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {RFValue} from 'react-native-responsive-fontsize';

import styled from 'styled-components';

import Icons from '../../../aseets/Global/Icons';
import HeaderBar from '../../../components/Global/HeaderBar';

import BodyPart from '../../../components/NormalUser/Hospital/BodyPart';
import BodyPartModal from '../../../components/NormalUser/Hospital/BodyPartModal';

const {height} = Dimensions.get('window');

const BodyPartScreen = props => {
  const screenValue = props.route.params.screenValue;
  //바텀탭 높이 _ 스크롤뷰
  const bottomTabHeight = useBottomTabBarHeight();
  const [showModal, setShowModal] = useState(false);
  const [selectedBodyPart, setSelectedBodyPart] = useState('');

  //신체부위 선택 핸들러 (사용자가 선택한 신체부위와 관련된 진료과 or 안내질문 다음 화면에서 show)
  const selectBodyPartHandler = selectedPart => {
    setSelectedBodyPart(selectedPart);
    //HospitalHome화면에서 진료과 버튼 클릭인 경우, 신체부위 선택하면 그에 관련된 진료과 화면으로 navigate
    if (screenValue === 'medicalDepartment') {
      if (selectedPart === '머리관련부위' || selectedPart === '체간관련부위') {
        setShowModal(true);
      } else {
        props.navigation.navigate('medicalDepartment', {
          selectedPart: selectedPart,
        });
      }
    }
    //HospitalHome화면에서 신체부위 질문 버튼 클릭인 경우, 신체부위 선택하면 그에 관련된 신체부위 질문 화면으로 navigate
    else if (screenValue === 'bodyPartGuide') {
      props.navigation.navigate('bodyPartGuide', {
        selectedPart: selectedPart,
      });
    }
  };
  return (
    <Container>
      <View>
        <HeaderBar.leftCenter
          leadingAction={() => {
            props.navigation.goBack();
          }}
          leadingIcon={<Icons.arrowBack />}
          centerTitle="신체부위 선택"
        />
        {screenValue === 'medicalDepartment' ? (
          <Title>
            신체부위를 선택하면 {'\n'}
            <HighlightText>관련된 진료과</HighlightText>를 볼 수 있어요!
          </Title>
        ) : (
          <Title>
            신체부위를 선택하면 {'\n'}
            <HighlightText>관련된 가이드 질문</HighlightText>을 볼 수 있어요!
          </Title>
        )}
        <ScrolleWrapper>
          <Wrapper bottomTabHeight={bottomTabHeight}>
            <BodyPart
              onBodyPartSelect={selectedBodyPart =>
                selectBodyPartHandler(selectedBodyPart)
              }
            />
          </Wrapper>
        </ScrolleWrapper>
        <BodyPartModal
          value={selectedBodyPart}
          isVisible={showModal}
          onModalCancel={() => setShowModal(false)}
          onBackdropPress={() => setShowModal(false)}
          onBodyPartSelect={selectedPart => {
            setShowModal(false);
            if (screenValue === 'medicalDepartment') {
              props.navigation.navigate('medicalDepartment', {
                selectedPart: selectedPart,
              });
            } else if (screenValue === 'bodyPartGuide') {
              props.navigation.navigate('bodyPartGuide', {
                selectedPart: selectedPart,
              });
            }
          }}
        />
      </View>
    </Container>
  );
};

const Container = styled.SafeAreaView`
  background-color: ${props => props.theme.colors.white};
  flex: 1;
`;
const Title = styled.Text`
  text-align: center;
  align-self: center;
  font-size: ${RFValue(15)}px;
  margin-top: ${height / 20}px;
  color: ${props => props.theme.colors.black};
`;

const HighlightText = styled.Text`
  font-weight: bold;
`;
const ScrolleWrapper = styled.ScrollView``;
const Wrapper = styled.View`
  margin-bottom: ${props => props.bottomTabHeight + 100}px;
`;

export default BodyPartScreen;
