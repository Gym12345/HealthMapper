import React, {useState} from 'react';
import {Dimensions} from 'react-native';

import styled from 'styled-components';
import Icons from '../../aseets/Auth/Icons';

const {height} = Dimensions.get('window');

const LoginInputForm = props => {
  const [isHide, setHide] = useState(true);
  return (
    <FormWrapper>
      <InputContainer>
        <InputWrapper
          value={props.value}
          autoCapitalize={props.autoCapitalize}
          placeholder={props.placeholder}
          // 비밀번호 폼이면 isHide에 따른 암호화 변경, 다른 폼이면 암호화 X.
          secureTextEntry={
            props.isPasswordForm ? (isHide ? true : false) : false
          }
          onChangeText={props.onChangeText}
        />
        {props.isPasswordForm ? (
          <ButtonWrapper activeOpacity={0.5} onPress={() => setHide(!isHide)}>
            {isHide ? <Icons.showeye /> : <Icons.hideeye />}
          </ButtonWrapper>
        ) : null}
      </InputContainer>
    </FormWrapper>
  );
};

const FormWrapper = styled.View`
  flex-direction: row;
  border: 1px;
  border-radius: 10px;
  justify-content: space-between;
  align-items: center;
  height: ${height / 16}px;
  margin-top: ${height / 35}px;
`;
const InputContainer = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const InputWrapper = styled.TextInput`
  padding: 10px;
  flex: 1;
`;
const ButtonWrapper = styled.TouchableOpacity`
  margin-right: 10px;
`;

export default LoginInputForm;
