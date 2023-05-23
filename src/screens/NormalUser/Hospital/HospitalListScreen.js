import React, {useEffect, useState} from 'react';
import {FlatList, Image, Dimensions, Button} from 'react-native';

import {RFValue} from 'react-native-responsive-fontsize';
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
  // 거리별 오름차순으로 정렬한 새로운 병원 배열 생성
  const sortedHealthArr = [...healthArr].sort(
    (a, b) => a.distance - b.distance,
  );
  const userLatitude = useSelector(state => state.hospital.userLatitude);
  const userLongitude = useSelector(state => state.hospital.userLongitude);

  const [currentPosition, setCurrentPosition] = useState(null);
  const [selectedHospital, setSelectedHospital] = useState(null);

  //useEffect를 사용해 병원 리스트 스크린 진입 시 사용자 위치 가져오기(비동기)
  useEffect(() => {
    setCurrentPosition({
      latitude: userLatitude,
      longitude: userLongitude,
    });
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
          //provider={PROVIDER_GOOGLE}
          region={{
            //현재 내위치를 기준으로 지도 렌더링
            latitude: currentPosition.latitude,
            longitude: currentPosition.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}>
          <Marker //현재 내위치
            coordinate={{
              latitude: currentPosition.latitude,
              longitude: currentPosition.longitude,
            }}
          />
          {healthArr.map(data => (
            <Marker
              key={data.id.toString()}
              coordinate={{
                latitude: data.hLatitude,
                longitude: data.hLongitude,
              }}
              title={data.name}
              description={data.distance.toString() + 'km'}
              onPress={() => setSelectedHospital(data)}>
              <Image
                source={require('../../../aseets/Hospital/hospitalMarker.png')}
                style={{width: 30, height: 30}}
              />
            </Marker>
          ))}
        </HospitalMap>
      )}
      {selectedHospital === null ? (
        <HospitalListWrapper bottomTabHeight={bottomTabHeight}>
          <FlatList
            data={sortedHealthArr}
            keyExtractor={item => item.id.toString()}
            renderItem={itemData => (
              <HospitalCard
                hospitalName={itemData.item.name}
                hospitalBodyPart={itemData.item.part}
                hospitalDepartment={itemData.item.department}
                hospitalAddress={itemData.item.address}
                distance={itemData.item.distance}
                onSelectHospital={() => {
                  props.navigation.navigate('hospitalDetail', {
                    selectedHospital: itemData.item,
                  });
                }}
              />
            )}
          />
        </HospitalListWrapper>
      ) : (
        <>
          <ShowTotalButton
            onPress={() => {
              setSelectedHospital(null);
            }}>
            <ButtonText>전체 병원리스트 보기</ButtonText>
          </ShowTotalButton>
          <HospitalCard
            hospitalName={selectedHospital.name}
            hospitalBodyPart={selectedHospital.part}
            hospitalDepartment={selectedHospital.department}
            hospitalAddress={selectedHospital.address}
            distance={selectedHospital.distance}
            onSelectHospital={() => {
              props.navigation.navigate('hospitalDetail', {
                selectedHospital: selectedHospital,
              });
            }}
          />
        </>
      )}
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
const ShowTotalButton = styled.TouchableOpacity`
  align-self: center;
  align-items: center;
  padding-vertical: 10px;
  background-color: ${props => props.theme.colors.patientColor};
  width: 100%;
  margin-bottom: 10px;
`;
const ButtonText = styled.Text`
  color: ${props => props.theme.colors.white};
  font-size: ${RFValue(15)}px;
  font-weight: bold;
`;

export default HospitalListScreen;
