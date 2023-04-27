import React, {useEffect} from 'react';
import {Button, FlatList, Text} from 'react-native';

import {useSelector} from 'react-redux';
import {getHospitalList_BodyPart} from '../../../store/slices/hospitalSlice';

import styled from 'styled-components';
import HeaderBar from '../../../components/Global/HeaderBar';
import Icons from '../../../aseets/Global/Icons';

const HospitalListScreen = props => {
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
      <FlatList
        data={healthArr}
        keyExtractor={item => item.id}
        renderItem={itemData => <Text>{itemData.item.name}</Text>}
      />
    </Container>
  );
};

const Container = styled.SafeAreaView`
  background-color: ${props => props.theme.colors.white};
`;
const Title = styled.Text``;

export default HospitalListScreen;
