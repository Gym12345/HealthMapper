import React, {useState, useCallback, useEffect} from 'react';
import {FlatList} from 'react-native';

import styled from 'styled-components';

import Icons from '../../../aseets/Global/Icons';
import HeaderBar from '../../../components/Global/HeaderBar';

import MedicalDepartmentCard from '../../../components/NormalUser/Hospital/MedicalDepartmentCard';
import medicalDepartmentData from '../../../data/medicalDepartmentData';

const MedicalDepartmentScreen = props => {
  //useState, useDispatch 써서 redux에서 선택된 진료과를 토대로 병원정보 받아오기

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
              onPressDepartment={() => {
                props.navigation.navigate('hospitalList', {
                  medicalDepartment: itemData.item.data,
                });
              }}
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
