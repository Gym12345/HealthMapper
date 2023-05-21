import React from 'react';
import {Image, Dimensions, Linking} from 'react-native';

import {useSelector} from 'react-redux';

import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components';
import HeaderBar from '../../../components/Global/HeaderBar';
import Icons from '../../../aseets/Global/Icons';

const {height} = Dimensions.get('window');

const MyHospitalScreen = props => {
  const myHospitalInfo = useSelector(state => state.hospital.myHospitalInfo);
  const userId = useSelector(state => state.auth.userId);
  return (
    <Container>
      <HeaderBar.leftCenter
        leadingAction={() => {
          props.navigation.goBack();
        }}
        leadingIcon={<Icons.arrowBack />}
        centerTitle={`${userId}님의 병원`}
      />
      <Hospitalwrapper>
        <HospitalTitle>{myHospitalInfo[0].name}</HospitalTitle>
        <HospitalAddress>{myHospitalInfo[0].address}</HospitalAddress>
        <HospitalDepartment>
          진료과목 - {myHospitalInfo[0].department}
        </HospitalDepartment>
        <ImageButtonWrapper
          onPress={() => {
            Linking.openURL(`https://&{selectedHospital.domain}`);
          }}>
          <Image
            //source={{uri: myHospitalInfo[0].image}}
            source={require('../../../aseets/Hospital/testHospitalImage.png')}
            style={{width: '100%', height: '100%', resizeMode: 'cover'}}
          />
        </ImageButtonWrapper>
      </Hospitalwrapper>
    </Container>
  );
};

const Container = styled.SafeAreaView`
  background-color: ${props => props.theme.colors.white};
`;
const Hospitalwrapper = styled.View`
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

export default MyHospitalScreen;
