import React, {useState} from 'react';
import {Platform} from 'react-native';

import styled from 'styled-components';
import Icons from '../../aseets/Hospital/Icons';

import {launchImageLibrary} from 'react-native-image-picker';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';

const HospitalImagePicker = props => {
  const [image, setImage] = useState(null);
  //image 라이브러리 오픈 함수
  const showImagePicker = () => {
    const options = {
      title: '사진 선택',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('사용자의 이미지 선택 취소');
      } else if (response.error) {
        console.log('이미지픽커 에러: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        //const source = {uri: response.assets[0].uri};
        const source = {uri: response.assets[0].uri};
        console.log(response);
        setImage(source);
      }
    });
  };

  //권한 유효성 확인 및 그에 따른 이미지라이브러리 호출
  const handleImagePicker = async () => {
    try {
      let result = await check(
        Platform.select({
          ios: PERMISSIONS.IOS.PHOTO_LIBRARY, //IOS 사진첩 권한 체크
          android: PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE, //안드로이드 사진첩 권한 체크
        }),
      );

      console.log(result);

      // 권한 허용 시 사진첩 show, 허용 아닐 시 다시 허용 요청
      if (result === RESULTS.GRANTED) {
        showImagePicker();
      } else {
        const requestResult = await request(
          Platform.select({
            ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
            android: PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
          }),
        );
        console.log(requestResult);
        if (requestResult === RESULTS.GRANTED) {
          showImagePicker();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <RowDirectionWrapper>
        <ButtonWrapper onPress={handleImagePicker}>
          <Icons.camera />
          <ButtonText>병원 {'\n'} 사진 추가</ButtonText>
        </ButtonWrapper>
        {image && (
          <ImageWrapper photoUrl={props.imageUrl}>
            <Image source={image} style={{width: 80, height: 80}} />
          </ImageWrapper>
        )}
      </RowDirectionWrapper>
    </Container>
  );
};

const Container = styled.View`
  margin-top: 10px;
`;
const RowDirectionWrapper = styled.View`
  flex-direction: row;
`;
const ButtonWrapper = styled.TouchableOpacity`
  align-items: center;
  border-width: 1px;
  border-color: ${props => props.theme.colors.gray5};
  margin-right: 10px;
  padding: 10px;
`;
const ImageWrapper = styled.View`
  border-width: 1px;
  border-color: ${props => props.theme.colors.gray5};
  align-items: center;
  justify-content: center;
`;
const ButtonText = styled.Text`
  text-align: center;
  color: ${props => props.theme.colors.black};
`;
const Image = styled.Image``;

export default HospitalImagePicker;
