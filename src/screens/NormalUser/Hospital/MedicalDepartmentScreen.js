import React, {useState, useEffect, useCallback} from 'react';
import {
  FlatList,
  Alert,
  Linking,
  View,
  ActivityIndicator,
  Platform,
  Dimensions,
  Button,
} from 'react-native';

import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';
import {useDispatch, useSelector} from 'react-redux';
import {
  getHospitalList_medicalDepartment,
  setUserPosition,
} from '../../../store/slices/hospitalSlice';
import {RFValue} from 'react-native-responsive-fontsize';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';

import styled from 'styled-components';
import Icons from '../../../aseets/Global/Icons';
import HeaderBar from '../../../components/Global/HeaderBar';

import MedicalDepartmentCard from '../../../components/NormalUser/Hospital/MedicalDepartmentCard';
import MedicalDepartmentData from '../../../data/medicalDepartmentData';

const spinnerColor = '#885fff';

const MedicalDepartmentScreen = props => {
  const selectedPart = props.route.params.selectedPart; //BodyPartScreen에서 사용자가 선택한 신체부위
  const bottomTabHeight = useBottomTabBarHeight(); //바텀탭 높이 _ 스크롤뷰
  const [error, setError] = useState(null);
  const [isLocationGetting, setIsLocationGetting] = useState(false);
  const [isMedicalDepartmentData, setIsMedicalDepartmentData] = useState(null);
  const dispatch = useDispatch();
  const isGetHospitalLoading = useSelector(state => state.hospital.isLoading);

  //병원 리스트 조회 전 위치 권한 확인 함수
  const checkLocationPermission = async () => {
    let result;
    try {
      result = await check(
        Platform.select({
          ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
          android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        }),
      );
      if (result === RESULTS.DENIED) {
        result = await request(
          Platform.select({
            ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
            android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
          }),
        );
      }
      return result === RESULTS.GRANTED;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  // 현재 위치의 위도와 경도 가져오기
  const getUserPosition = () => {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        position => {
          console.log(position);
          resolve(position);
        },
        error => {
          console.log(error);
          reject(
            '앱을 사용하기 위해서는 위치 정보를 사용해야 합니다. 설정에서 위치 정보를 켜주세요.',
          );
        },
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
      );
    });
  };

  // 신체부위 선택에 따른 진료과 get 함수
  const getMedicalDepartmentData = selectedPart => {
    switch (selectedPart) {
      case '눈':
        return MedicalDepartmentData.eyeMedicalDepartmentData;
      case '코':
        return MedicalDepartmentData.noseMedicalDepartmentData;
      case '입':
        return MedicalDepartmentData.mouthMedicalDepartmentData;
      case '귀':
        return MedicalDepartmentData.earMedicalDepartmentData;
      case '목':
        return MedicalDepartmentData.neckMedicalDepartmentData;
      case '머리':
        return MedicalDepartmentData.headMedicalDepartmentData;
      case '가슴':
        return MedicalDepartmentData.chestMedicalDepartmentData;
      case '배':
        return MedicalDepartmentData.stomachMedicalDepartmentData;
      case '등':
        return MedicalDepartmentData.backMedicalDepartmentData;
      case '어깨':
        return MedicalDepartmentData.shoulderMedicalDepartmentData;
      case '팔':
        return MedicalDepartmentData.armMedicalDepartmentData;
      case '손':
        return MedicalDepartmentData.handMedicalDepartmentData;
      case '다리':
        return MedicalDepartmentData.legMedicalDepartmentData;
      case '발':
        return MedicalDepartmentData.footMedicalDepartmentData;
      default:
        return MedicalDepartmentData.totalMedicalDepartmentData;
    }
  };

  //병원 리스트 조회 핸들러 (사용자가 선택한 진료과를 진료과 핸들러로 dispatch)
  const getHospitalListHandler = useCallback(
    async selectedDepart => {
      setError(null);
      try {
        const hasLocationPermission = await checkLocationPermission(); // 위치 권한 확인
        if (!hasLocationPermission) {
          Alert.alert('위치 권한을 허용해주어야 합니다.', undefined, [
            {text: '취소', style: 'cancel'},
            {
              text: '설정으로 이동',
              onPress: () => {
                Linking.openSettings();
              },
            },
          ]);
          return;
        }
        //getCurrentPosition이 시간을 꽤 먹어서 위치가져올 때 LoadingView를 렌더링하기 위한 state변수
        setIsLocationGetting(true);
        const position = await getUserPosition();
        setIsLocationGetting(false);
        await dispatch(
          //사용자 위치 GET
          setUserPosition({
            userLatitude: position.coords.latitude,
            userLongitude: position.coords.longitude,
          }),
        );
        //사용자의 진료과 선택, 위치를 기반으로 병원리스트 조회
        await dispatch(
          getHospitalList_medicalDepartment({
            department: selectedDepart,
            userLatitude: String(position.coords.latitude), //서버에서 문자열로 처리하기에 문자열로 전달
            userLongitude: String(position.coords.longitude), //서버에서 문자열로 처리하기에 문자열로 전달
          }),
        ).unwrap();
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

  //화면에 신체부위 전달받아서 FlatList의 data에 신체부위와 관련된 진료과 data전달해주는 함수
  useEffect(() => {
    const medicalDepartmentData = getMedicalDepartmentData(selectedPart);
    setIsMedicalDepartmentData(medicalDepartmentData);
  }, [selectedPart, MedicalDepartmentData]);

  return (
    <Container>
      {isGetHospitalLoading || isLocationGetting ? (
        <LoadingView>
          <ActivityIndicator size="large" color={spinnerColor} />
          <LoadingText>
            병원 정보를 불러오고 있어요 {'\n'} 잠시만 기다려주세요...
          </LoadingText>
        </LoadingView>
      ) : (
        <View>
          <HeaderBar.leftCenter
            leadingAction={() => {
              props.navigation.goBack();
            }}
            leadingIcon={<Icons.arrowBack />}
            centerTitle={`${selectedPart} 관련 진료과`}
          />
          <CardContainer bottomTabHeight={bottomTabHeight}>
            <FlatList
              data={isMedicalDepartmentData}
              keyExtractor={item => item.id}
              numColumns={3}
              renderItem={itemData => (
                <MedicalDepartmentCard
                  medicalDepartment={itemData.item.data}
                  departmentIcon={itemData.item.icon}
                  onSelectDepartment={() =>
                    getHospitalListHandler(itemData.item.data)
                  }
                />
              )}
            />
          </CardContainer>
        </View>
      )}
    </Container>
  );
};

const Container = styled.SafeAreaView`
  background-color: ${props => props.theme.colors.white};
  flex: 1;
`;
const LoadingView = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
`;
const LoadingText = styled.Text`
  margin-top: 20px;
  font-size: ${RFValue(15)}px;
  text-align: center;
  color: ${props => props.theme.colors.gray3};
`;
const CardContainer = styled.View`
  align-items: center;
  padding: 10px;
  margin-bottom: ${props => props.bottomTabHeight + 30}px;
`;

export default MedicalDepartmentScreen;
