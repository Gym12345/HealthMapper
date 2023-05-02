import React, {useState, useEffect, useCallback} from 'react';
import {FlatList, Alert, Linking} from 'react-native';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';

import {useDispatch} from 'react-redux';
import {getHospitalList_medicalDepartment} from '../../../store/slices/hospitalSlice';

import styled from 'styled-components';
import Icons from '../../../aseets/Global/Icons';
import HeaderBar from '../../../components/Global/HeaderBar';

import MedicalDepartmentCard from '../../../components/NormalUser/Hospital/MedicalDepartmentCard';
import medicalDepartmentData from '../../../data/medicalDepartmentData';

const MedicalDepartmentScreen = props => {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  //병원 리스트 조회 전 위치 권한 확인 함수
  const checkLocationPermission = async () => {
    try {
      let result = await check(
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
      console.log('Result:', result);
      return result === RESULTS.GRANTED;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  //병원 리스트 조회 핸들러 (사용자가 선택한 진료과를 진료과 핸들러로 dispatch)
  const getHospitalListHandler = useCallback(
    async selectedPart => {
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
        await dispatch(
          getHospitalList_medicalDepartment(selectedPart),
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

  return (
    <Container>
      <HeaderBar.leftCenter
        leadingAction={() => {
          props.navigation.goBack();
        }}
        leadingIcon={<Icons.arrowBack />}
        centerTitle="진료과 선택"
      />
      <CardContainer>
        <FlatList
          data={medicalDepartmentData}
          keyExtractor={item => item.id}
          numColumns={3}
          renderItem={itemData => (
            <MedicalDepartmentCard
              medicalDepartment={itemData.item.data}
              departmentIcon={itemData.item.icon}
              onPressDepartment={() =>
                getHospitalListHandler(itemData.item.data)
              }
            />
          )}
        />
      </CardContainer>
    </Container>
  );
};

const Container = styled.SafeAreaView`
  background-color: ${props => props.theme.colors.white};
`;
const CardContainer = styled.View`
  align-items: center;
  padding: 10px;
`;

export default MedicalDepartmentScreen;
