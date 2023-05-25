import React, {useEffect, useState} from 'react';
import {FlatList, Image, Dimensions, View, Text} from 'react-native';

import {RFValue} from 'react-native-responsive-fontsize';
import MapView, {PROVIDER_GOOGLE, Marker, Callout} from 'react-native-maps';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {useSelector} from 'react-redux';

import styled from 'styled-components';
import HeaderBar from '../../../components/Global/HeaderBar';
import Icons from '../../../aseets/Global/Icons';
import Modal from 'react-native-modal';

import HospitalCard from '../../../components/NormalUser/Hospital/HospitalCard';

const {height, width} = Dimensions.get('window');

const HospitalListScreen = props => {
  //바텀탭 높이
  const bottomTabHeight = useBottomTabBarHeight();
  //병원 정보 (병원 리스트 및 그에 따른 정보_ 현재위치로부터의 거리, 병원위도, 병원경도 포함)
  const healthArr = useSelector(state => state.hospital.healthArr);
  // 거리별 오름차순으로 정렬한 새로운 70개의 병원 배열 생성
  const sortedHealthArr = [...healthArr]
    .sort((a, b) => a.distance - b.distance)
    .slice(0, 70);
  const userLatitude = useSelector(state => state.hospital.userLatitude);
  const userLongitude = useSelector(state => state.hospital.userLongitude);

  const [currentPosition, setCurrentPosition] = useState(null);
  const [selectedHospital, setSelectedHospital] = useState(null); //선택된 병원 state변수
  const [showModal, setShowModal] = useState(false);

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
      {currentPosition && (
        <HospitalMap
          //provider={PROVIDER_GOOGLE}
          region={
            //선택된 병원을 기준으로 지도 렌더링(초기값은 내위치)
            selectedHospital
              ? {
                  latitude: selectedHospital.hLatitude,
                  longitude: selectedHospital.hLongitude,
                  latitudeDelta: 0.005,
                  longitudeDelta: 0.005,
                }
              : {
                  latitude: currentPosition.latitude,
                  longitude: currentPosition.longitude,
                  latitudeDelta: 0.01,
                  longitudeDelta: 0.01,
                }
          }>
          <Marker //현재 내위치
            coordinate={{
              latitude: currentPosition.latitude,
              longitude: currentPosition.longitude,
            }}
          />
          {sortedHealthArr.map(data => (
            <Marker
              key={data.id.toString()}
              coordinate={{
                latitude: data.hLatitude,
                longitude: data.hLongitude,
              }}
              onPress={() => {
                setSelectedHospital(data);
                setShowModal(true);
              }}>
              {/* 선택된 병원의 이미지 마커는 크게 설정함으로써 사용자에게 선택된 병원마커를 알리기 위해 구분 */}
              <ImageWrapper>
                {data === selectedHospital ? (
                  <Image
                    source={require('../../../aseets/Hospital/selectedHospitalMarker.png')}
                    style={{width: 45, height: 45}}
                  />
                ) : (
                  <Image
                    source={require('../../../aseets/Hospital/selectedHospitalMarker.png')}
                    style={{width: 30, height: 30}}
                  />
                )}
              </ImageWrapper>
            </Marker>
          ))}
        </HospitalMap>
      )}
      <AlertText>
        현재 위치를 기준으로 가까운 70개의 병원 리스트입니다.
      </AlertText>
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
                setSelectedHospital(itemData.item);
                setShowModal(true);
              }}
            />
          )}
        />
      </HospitalListWrapper>

      {/* 병원카드 및 마커 클릭 시 showModal */}
      <HospitalModal
        isVisible={showModal}
        transparent={true}
        onBackdropPress={() => {
          setShowModal(false);
        }}>
        <ModalWrapper>
          <ModalTitle>병원을 클릭하면 상세정보를 확인할 수 있어요!</ModalTitle>
          {selectedHospital !== null && (
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
                setShowModal(false);
              }}
            />
          )}
        </ModalWrapper>
      </HospitalModal>
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
const AlertText = styled.Text`
  font-size: ${RFValue(11)}px;
  align-self: flex-end;
  color: ${props => props.theme.colors.gray4};
`;
const HospitalListWrapper = styled.View`
  flex: 1;
`;
const HospitalModal = styled(Modal)`
  flex: 1;
  justify-content: flex-end;
  margin: 0;
`;
const ModalWrapper = styled.View`
  background-color: ${props => props.theme.colors.gray8};
  padding-top: ${height / 30}px;
  padding-bottom: ${height / 20}px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
`;
const ModalTitle = styled.Text`
  text-align: center;
  font-size: ${RFValue(15)}px;
  color: ${props => props.theme.colors.black};
  margin-bottom: ${height / 50}px;
`;
const ImageWrapper = styled.View`
  width: 45px;
  height: 45px;
  align-items: center;
`;

export default HospitalListScreen;
