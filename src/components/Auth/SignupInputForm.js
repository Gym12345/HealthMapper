import React, {useState} from 'react';
import {Dimensions} from 'react-native';

import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components';
import Icons from '../../aseets/Auth/Icons';

const {height} = Dimensions.get('window');

const SignupInputForm = props => {
  const [isHide, setHide] = useState(true);
  return (
    <FormWrapper>
      <FormTitle>{props.formTitle}</FormTitle>
      <InputContainer active={props.active}>
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
  margin-top: ${height / 40}px;
`;
const FormTitle = styled.Text`
  margin-vertical: 8px;
  font-weight: bold;
  color: ${props => props.theme.colors.black};
  font-size: ${RFValue(15)}px;
`;
const InputContainer = styled.View`
  align-items: center;
  flex-direction: row;
  border: 1px;
  border-radius: 10px;
  border-color: ${props =>
    props.active ? props.theme.colors.black : props.theme.colors.alertColor}
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 40px;
`;
const InputWrapper = styled.TextInput`
  padding: 10px;
  flex: 1;
`;
const ButtonWrapper = styled.TouchableOpacity`
  margin-right: 10px;
`;

export default SignupInputForm;
