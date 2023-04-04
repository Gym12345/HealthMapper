import React from 'react';
import {Dimensions} from 'react-native';

import styled from 'styled-components';

const {width, height} = Dimensions.get('window');

const InputForm = props => {
  return (
    <FormWrapper>
      <InputWrapper
        autoCapitalize="none"
        placeholder={props.placeholder}
        onChangeText={props.onChangeText}
      />
    </FormWrapper>
  );
};

const FormWrapper = styled.View``;
const InputWrapper = styled.TextInput`
  border: 1px;
  border-radius: 10px;
  padding: 10px;
  height: 40px;
  margin-top: ${height / 35}px;
`;

export default InputForm;
