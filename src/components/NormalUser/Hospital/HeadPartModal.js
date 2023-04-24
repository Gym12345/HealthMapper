import React, {useState} from 'react';
import {Text, Dimensions, FlatList} from 'react-native';

import Modal from 'react-native-modal';
import styled from 'styled-components';

import headPartData from '../../../data/headPartData';

const {width} = Dimensions.get('window');

const HeadPartModal = props => {
  return (
    <Modal
      isVisible={props.isVisible}
      transparent={true}
      onBackdropPress={props.onBackdropPress}>
      <ModalContainer>
        <ModalTitle>다양한 신체부위들이 있어요!</ModalTitle>
        <FlatList
          data={headPartData}
          keyExtractor={item => item.id}
          numColumns={3}
          renderItem={itemData => (
            <Wrapper
              activeOpacity={0.5}
              onPress={() => props.onBodyPartSelect(itemData.item.data)}>
              {itemData.item.icon}
              <PartText>{itemData.item.data}</PartText>
            </Wrapper>
          )}
        />
        <CancelButtonWrapper onPress={props.onModalCancel}>
          <CancelText>취소</CancelText>
        </CancelButtonWrapper>
      </ModalContainer>
    </Modal>
  );
};

const ModalContainer = styled.View`
  background-color: ${props => props.theme.colors.white};
  padding: 20px;
  border-radius: 20px;
  align-items: center;
`;
const ModalTitle = styled.Text`
  color: ${props => props.theme.colors.gray1};
  margin-bottom: 15px;
`;
const Wrapper = styled.TouchableOpacity`
  background-color: ${props => props.theme.colors.gray8};
  margin-vertical: 10px;
  margin-horizontal: 7px;
  align-items: center;
  justify-content: center;
  padding-horizontal: 20px;
  padding-vertical: 10px;
  border-radius: 10px;
  border-color: ${props => props.theme.colors.gray7};
  border-width: 1px;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.4);
  elevation: 8;
`;
const PartText = styled.Text`
  margin-top: 5px;
  color: ${props => props.theme.colors.black};
`;
const CancelButtonWrapper = styled.TouchableOpacity`
  border-radius: 10px;
  margin-top: 20px;
`;
const CancelText = styled.Text`
  color: ${props => props.theme.colors.gray2};
  font-size: 16px;
  font-weight: bold;
`;
export default HeadPartModal;
