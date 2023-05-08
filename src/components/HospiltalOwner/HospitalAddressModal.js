import React from 'react';
import {Dimensions} from 'react-native';

import styled from 'styled-components';

import Modal from 'react-native-modal';
import Postcode from '@actbase/react-daum-postcode';

const {height, width} = Dimensions.get('window');
const HospitalAddressModal = props => {
  return (
    <Modal
      isVisible={props.isVisible}
      transparent={true}
      onBackdropPress={props.onBackdropPress}>
      <ModalContainer>
        <CustomPostcode
          jsOptions={{animation: true, hideMapBtn: true}}
          onSelected={props.onSelectedAddress}
        />
      </ModalContainer>
    </Modal>
  );
};
const ModalContainer = styled.KeyboardAvoidingView`
  align-items: center;
  flex: 0.8;
`;
const CustomPostcode = styled(Postcode)`
  width: ${width - 50}px;
  height: ${height / 1.4}px;
`;

export default HospitalAddressModal;
