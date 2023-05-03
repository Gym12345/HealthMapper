import React, {useCallback, useState} from 'react';
import {Image, Dimensions, Alert, Linking} from 'react-native';

import {useSelector} from 'react-redux';
import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components';
import HeaderBar from '../../../components/Global/HeaderBar';
import Icons from '../../../aseets/Global/Icons';

const {width, height} = Dimensions.get('window');

const HospitalDetailScreen = props => {
  const selectedHospital = props.route.params.selectedHospital;
  const userClass = useSelector(state => state.auth.userClass);
  const [reviewCount, setReviewCount] = useState(0);

  // 게스트 사용자에게 로그인 안내 알림창. 후기는 로그인 시에만 가능한 기능.
  const showLoginScreen = useCallback(() => {
    Alert.alert('안내', '로그인이 필요한 서비스입니다', [
      {
        text: '확인',
        onPress: () => props.navigation.navigate('auth'),
      },
    ]);
  }, [showLoginScreen]);
  return (
    <Container>
      <HeaderBar.leftCenter
        leadingAction={() => {
          props.navigation.goBack();
        }}
        leadingIcon={<Icons.arrowBack />}
        centerTitle={selectedHospital.name}
      />
      <Hospitalwrapper>
        <HospitalTitle>{selectedHospital.name}</HospitalTitle>
        <HospitalAddress>{selectedHospital.address}</HospitalAddress>
        <HospitalDepartment>
          진료과목 - {selectedHospital.department}
        </HospitalDepartment>
        <ImageButtonWrapper
          onPress={() => {
            Linking.openURL(`https://&{selectedHospital.domain}`);
          }}>
          <Image
            //source={{uri: selectedHospital.image}}
            source={require('../../../aseets/Hospital/testHospitalImage.png')}
            style={{width: '100%', height: '100%', resizeMode: 'cover'}}
          />
        </ImageButtonWrapper>
      </Hospitalwrapper>

      <DivisionLine />
      <ReviewWrapper>
        <ReviewTitle>리뷰 {reviewCount}</ReviewTitle>
        <ReviewButton
          activceOpacity={0.5}
          onPress={() => {
            {
              userClass === 'guest'
                ? showLoginScreen()
                : props.navigation.navigate('reviewRegist', {
                    selectedHospital: selectedHospital,
                  });
            }
          }}>
          <ReviewButtonText>리뷰 쓰기 </ReviewButtonText>
        </ReviewButton>
      </ReviewWrapper>
    </Container>
  );
};

const Container = styled.SafeAreaView`
  background-color: ${props => props.theme.colors.white};
`;
const Hospitalwrapper = styled.ScrollView`
  padding: 20px;
`;

const HospitalTitle = styled.Text`
  margin-top: ${height / 20}px;
  font-size: ${RFValue(20)}px;
  font-weight: bold;
  color: ${props => props.theme.colors.patientColor};
`;
const HospitalAddress = styled.Text`
  margin-top: ${height / 40}px;
  font-size: ${RFValue(14)}px;
  color: ${props => props.theme.colors.black};
`;
const HospitalDepartment = styled.Text`
  margin-top: 5px;
  font-size: ${RFValue(12)}px;
  color: ${props => props.theme.colors.gray2};
`;
const ImageButtonWrapper = styled.TouchableOpacity`
  margin-top: ${height / 30}px;
  border-radius: 15px;
  height: ${height / 4}px;
  overflow: hidden;
`;
const DivisionLine = styled.View`
  width: 100%;
  height: 10px;
  background-color: ${props => props.theme.colors.gray6};
`;
const ReviewWrapper = styled.View`
  margin-top: ${height / 40}px;
  padding: 20px;
`;
const ReviewTitle = styled.Text`
  font-size: ${RFValue(18)}px;
  justify-content: center;
  font-weight: bold;
  color: ${props => props.theme.colors.black};
`;
const ReviewButton = styled.TouchableOpacity`
  margin-top: 20px;
  align-self: center;
  align-items: center;
  padding: 10px;
  width: 100%;
  border: 2px;
  border-radius: 10px;
  border-color: ${props => props.theme.colors.patientColor};
`;
const ReviewButtonText = styled.Text`
  margin-vertical: 5px;
  font-weight: 600;
  font-size: ${RFValue(13)}px;
  color: ${props => props.theme.colors.black};
`;

export default HospitalDetailScreen;
