import React from 'react';
import {FlatList, StyleSheet, View, Dimensions} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';

import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {useSelector} from 'react-redux';

import styled from 'styled-components';
import HeaderBar from '../../../components/Global/HeaderBar';
import Icons from '../../../aseets/Global/Icons';

import HospitalCard from '../../../components/NormalUser/Hospital/HospitalCard';

const {height, width} = Dimensions.get('window');

const HospitalListScreen = props => {
  //바텀탭 높이
  const bottomTabHeight = useBottomTabBarHeight();

  const healthArr = useSelector(state => state.hospital.healthArr);
  return (
    <Container>
      <HeaderBar.leftCenter
        leadingAction={() => {
          props.navigation.goBack();
        }}
        leadingIcon={<Icons.arrowBack />}
        centerTitle="병원 리스트"
      />
      <HospitalMap
        provider={PROVIDER_GOOGLE}
        region={{
          latitude: 37.5665,
          longitude: 126.978,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}>
        <Marker
          coordinate={{
            latitude: 37.5665,
            longitude: 126.978,
          }}
        />
      </HospitalMap>
      <HospitalListWrapper bottomTabHeight={bottomTabHeight}>
        <FlatList
          data={healthArr}
          keyExtractor={item => item.id}
          renderItem={itemData => (
            <HospitalCard
              hospitalName={itemData.item.name}
              hospitalDepartment={itemData.item.department}
              hospitalAddress={itemData.item.address}
              hospitalBodyPart={itemData.item.part}
              onSelectHospital={() => {
                props.navigation.navigate('hospitalDetail');
              }}
            />
          )}
        />
      </HospitalListWrapper>
    </Container>
  );
};

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${props => props.theme.colors.white};
`;

const HospitalMap = styled(MapView)`
  width: ${width}px;
  height: ${height / 2.5}px;
`;
const HospitalListWrapper = styled.View`
  flex: 1;
  margin-top: 10px;
`;

export default HospitalListScreen;
