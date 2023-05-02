import React, {useEffect, useState} from 'react';
import {FlatList, Dimensions, Linking} from 'react-native';

import Geolocation from '@react-native-community/geolocation';
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
  //병원 정보 (병원 리스트 및 그에 따른 정보_ 현재위치로부터의 거리, 병원위도, 병원경도 포함)
  const healthArr = useSelector(state => state.hospital.healthArr);

  const [currentPosition, setCurrentPosition] = useState(null);

  // 현재 위치 가져오는 함수
  const getCurrentPosition = () => {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        position => {
          resolve(position);
        },
        error => {
          reject(error);
        },
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
      );
    });
  };
  //useEffect를 사용해 병원 리스트 스크린 진입 시 사용자 위치 가져오기(비동기)
  useEffect(() => {
    getCurrentPosition()
      .then(position => {
        const {latitude, longitude} = position.coords;
        setCurrentPosition({latitude, longitude});
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <Container>
      <HeaderBar.leftCenter
        leadingAction={() => {
          props.navigation.goBack();
        }}
        leadingIcon={<Icons.arrowBack />}
        centerTitle="병원 리스트"
      />
      {/*지도에 현재 위치 표시*/}
      {currentPosition && (
        <HospitalMap
          provider={PROVIDER_GOOGLE}
          region={{
            latitude: currentPosition.latitude,
            longitude: currentPosition.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}>
          <Marker
            coordinate={{
              latitude: currentPosition.latitude,
              longitude: currentPosition.longitude,
            }}
          />
        </HospitalMap>
      )}

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
