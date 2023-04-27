import React, {useState, useEffect, useCallback} from 'react';
import {FlatList, Alert} from 'react-native';

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
  //병원 리스트 조회 핸들러 (사용자가 선택한 진료과를 진료과 핸들러로 dispatch)
  const getHospitalListHandler = useCallback(
    async selectedDepartment => {
      try {
        await dispatch(
          getHospitalList_medicalDepartment(selectedDepartment),
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
