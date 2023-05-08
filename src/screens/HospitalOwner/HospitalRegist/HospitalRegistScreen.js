import React, {useState, useEffect, useCallback} from 'react';
import {BackHandler, Dimensions, FlatList, Alert} from 'react-native';

import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {useFocusEffect} from '@react-navigation/native';

import Geocoder from 'react-native-geocoding';
import Config from 'react-native-config';

import {RFValue} from 'react-native-responsive-fontsize';
import HeaderBar from '../../../components/Global/HeaderBar';
import styled from 'styled-components';

import {useDispatch} from 'react-redux';
import {submitHospitalInfo} from '../../../store/slices/hospitalSlice';

import HospitalAddressModal from '../../../components/HospiltalOwner/HospitalAddressModal';
import HospitalInputForm from '../../../components/HospiltalOwner/HospitalInputForm';
import PartCard from '../../../components/HospiltalOwner/PartCard';
import HospitalImagePicker from '../../../components/HospiltalOwner/HospitalImagePicker';
import medicalDepartmentData from '../../../data/medicalDepartmentData';
import BodyPartData from '../../../data/BodyPartData';

const {height} = Dimensions.get('window');

// 병원등록 요청을 위해 병원 이름, URL주소, 설명, 주소, 관련 진료과, 관련 신체부위 기입 화면
const HospitalRegistScreen = props => {
  const bottomTabHeight = useBottomTabBarHeight(); //바텀탭 높이 _ 스크롤뷰
  const dispatch = useDispatch();
  const [isHospitalName, setIsHospitalName] = useState(null);
  const [isHospitalAddress, setIsHospitalAddress] = useState(null);
  const [isHospitalDomain, setIsHospitalDomain] = useState(null);
  const [isHospitalDescription, setIsHospitalDescription] = useState(null);
  const [isHospitalImage, setIsHospitalImage] = useState('testHospital.png'); //추후 정상적인 사진 경로로 대체
  const [selectedMedicalParts, setselectedMedicalParts] = useState([]); //선택된 진료과
  const [selectedBodyParts, setselectedBodyParts] = useState([]); //선택된 신체부위
  const [isHospitalLatitude, setIsHospitalLatitude] = useState();
  const [isHospitalLongitude, setIsHospitalLongitude] = useState();
  const [isButtonActive, setIsButtonActive] = useState(false);
  const [showModal, setShowModal] = useState(false);

  //병원 등록할 때 마지막 값인 "모든병원"은 안쓰이므로 새로운 데이터배열 생성해서 FlatList에 전달
  const registMedicalDepartmentData = medicalDepartmentData.slice(0, -1);

  //진료과, 신체부위 card들에 따른 각 parts배열 update
  const updateSelectedCard = (
    selectedParts,
    setSelectedParts,
    selectedCardData,
  ) => {
    // 기존 parts배열에 선택된 card가 있다면 배열에서 제거(active해제)
    if (selectedParts.includes(selectedCardData)) {
      setSelectedParts(selectedParts.filter(ele => ele !== selectedCardData));
    }
    // 기존 parts배열에 선택된 card가 없다면 배열에 추가
    else {
      setSelectedParts([...selectedParts, selectedCardData]);
    }
  };

  //진료과 및 신체부위 각 card를 선택했을 때의 핸들러함수
  const selectCardHandler = selectedCardData => {
    //신체부위 쪽 card선택 시 bodyParts배열에 관한 updateSelecetedCard함수 진입
    if (selectedCardData.totalValue === '신체부위') {
      updateSelectedCard(
        selectedBodyParts,
        setselectedBodyParts,
        selectedCardData,
      );
    }
    //진료과 쪽 card선택 시 medicalPars배열에 관한 updateSelecetedCard함수 진입
    else {
      updateSelectedCard(
        selectedMedicalParts,
        setselectedMedicalParts,
        selectedCardData,
      );
    }
  };

  //병원 도로명 주소 선택되면 위도, 경도 얻어오는 함수
  useEffect(() => {
    if (isHospitalAddress) {
      Geocoder.init(Config.GOOGLE_MAPS_API_KEY);

      Geocoder.from(isHospitalAddress)
        .then(json => {
          const {lat, lng} = json.results[0].geometry.location;
          console.log(lat, lng);
          setIsHospitalLatitude(lat);
          setIsHospitalLongitude(lng);
        })
        .catch(error => console.warn(error));
    }
  }, [isHospitalAddress]);

  //병원 등록 요청 버튼 액티브 활성화
  useEffect(() => {
    if (
      isHospitalName &&
      isHospitalAddress &&
      isHospitalDomain &&
      isHospitalImage &&
      isHospitalDescription &&
      selectedMedicalParts.length > 0 &&
      selectedBodyParts.length > 0
    ) {
      setIsButtonActive(true);
    } else {
      setIsButtonActive(false);
    }
  }, [
    isHospitalName,
    isHospitalAddress,
    isHospitalDomain,
    isHospitalImage,
    isHospitalDescription,
    selectedMedicalParts,
    selectedBodyParts,
  ]);

  //뒤로가기 눌를 시 앱종료_안드로이드
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        if (
          isHospitalName ||
          isHospitalAddress ||
          isHospitalDomain ||
          isHospitalDescription ||
          selectedMedicalParts.length > 0 ||
          selectedBodyParts.length > 0
        ) {
          Alert.alert(
            null,
            '작성한 내용은 저장되지 않습니다.\n정말로 취소하시겠습니까?',
            [
              {text: '아니오', style: 'cancel'},
              {
                text: '예',
                onPress: () => {
                  BackHandler.exitApp();
                },
              },
            ],
          );
        } else {
          BackHandler.exitApp();
        }
        return true;
      };
      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [
      isHospitalName,
      isHospitalAddress,
      isHospitalDomain,
      isHospitalDescription,
      selectedMedicalParts,
      selectedBodyParts,
    ]),
  );

  const submitHospitalHandler = useCallback(async () => {
    const selectedBodyPartsData = selectedBodyParts.map(item => item.data); //선택된 신체부위 param
    const selectedMedicalPartsData = selectedMedicalParts.map(
      item => item.data,
    ); //선택된 진료과 param
    try {
      await dispatch(
        submitHospitalInfo({
          reqName: isHospitalName,
          reqAddress: isHospitalAddress,
          reqDomain: isHospitalDomain,
          reqDescription: isHospitalDescription,
          reqImg: isHospitalImage,
          reqPart: selectedBodyPartsData,
          reqDepartment: selectedMedicalPartsData,
          reqLatitude: String(isHospitalLatitude), //서버에서 문자열로 처리하기에 문자열로 전달
          reqLongitude: String(isHospitalLongitude), //서버에서 문자열로 처리하기에 문자열로 전달
        }),
      ).unwrap();
    } catch (error) {
      console.log(error);
    }
  }, [
    dispatch,
    isHospitalName,
    isHospitalAddress,
    isHospitalDomain,
    isHospitalDescription,
    isHospitalImage,
    selectedBodyParts,
    selectedMedicalParts,
    isHospitalLatitude,
    isHospitalLongitude,
  ]);

  return (
    <Container>
      <HeaderBar.centerOnly centerTitle="병원 등록하기" />
      <RegistWrapper>
        <Title>병원 등록접수</Title>
        <ScrollWrapper>
          <Wrapper bottomTabHeight={bottomTabHeight}>
            <FormTitle>병원 정보{'   '}(필수입력)</FormTitle>
            <HospitalInputForm
              // 도로 주소명 찾기 눌렀을 때 주소모달 open
              onPressFindAddress={() => {
                setShowModal(true);
              }}
              isHospitalAddress={isHospitalAddress}
              isHospitalName={isHospitalName}
              isHospitalDomain={isHospitalDomain}
              isHospitalDescription={isHospitalDescription}
              setIsHospitalName={setIsHospitalName}
              setIsHospitalDomain={setIsHospitalDomain}
              setIsHospitalDescription={setIsHospitalDescription}
            />
            {/* Image Picker */}
            <HospitalImagePicker />
            {/* 병원 진료과 카드 */}
            <FormTitle>진료과{'   '}(필수선택)</FormTitle>
            <CardContainer>
              <FlatList
                scrollEnabled={false}
                data={registMedicalDepartmentData}
                keyExtractor={item => item.id}
                numColumns={3}
                renderItem={itemData => (
                  <PartCard
                    //각 Card에 대해 selectedBodyPats배열에 있는 id에 각 Card들의 id가 있으면 true
                    cardActive={selectedMedicalParts.some(
                      ele => ele.id === itemData.item.id,
                    )}
                    onSelect={() => {
                      selectCardHandler(itemData.item);
                    }}
                    part={itemData.item.data}
                  />
                )}
              />
            </CardContainer>
            {/* 병원 신체부위 카드 */}
            <FormTitle>신체부위{'   '}(필수선택)</FormTitle>
            <CardContainer>
              <FlatList
                scrollEnabled={false}
                data={BodyPartData.totalBodyPartData}
                keyExtractor={item => item.id}
                numColumns={3}
                renderItem={itemData => (
                  <PartCard
                    //각 Card에 대해 selectedBodyPats배열에 있는 id에 각 Card들의 id가 있으면 true
                    cardActive={selectedBodyParts.some(
                      ele => ele.id === itemData.item.id,
                    )}
                    onSelect={() => selectCardHandler(itemData.item)}
                    part={itemData.item.data}
                  />
                )}
              />
            </CardContainer>
            <ButtonWrapper
              bottomTabHeight={bottomTabHeight}
              buttonActive={isButtonActive}
              disabled={!isButtonActive}
              onPress={submitHospitalHandler}>
              <SubmitButtonTitle buttonActive={isButtonActive}>
                병원 등록 접수하기
              </SubmitButtonTitle>
            </ButtonWrapper>
          </Wrapper>
        </ScrollWrapper>
      </RegistWrapper>
      {/* 우편번호, 도로명 찾기 modal */}
      <HospitalAddressModal
        isVisible={showModal}
        onBackdropPress={() => setShowModal(false)}
        //주소명 클릭 시 등록할 병원의 주소 state변수에 저장.
        onSelectedAddress={data => {
          console.log(JSON.stringify(data));
          setShowModal(false);
          setIsHospitalAddress(data.address);
        }}
      />
    </Container>
  );
};

const Container = styled.SafeAreaView`
  background-color: ${props => props.theme.colors.white};
`;
const RegistWrapper = styled.View`
  margin-top: ${height / 20}px;
  align-items: center;
`;
const Wrapper = styled.View`
  padding: 15px;
  margin-bottom: ${props => props.bottomTabHeight + 50}px;
`;
const ScrollWrapper = styled.ScrollView``;
const Title = styled.Text`
  font-weight: bold;
  color: ${props => props.theme.colors.black};
  font-size: ${RFValue(23)}px;
`;
const FormTitle = styled.Text`
  margin-top: ${height / 20}px;
  font-size: ${RFValue(17)}px;
  color: ${props => props.theme.colors.gray3};
  font-weight: bold;
`;
const CardContainer = styled.View`
  align-items: center;
  margin-top: 5px;
`;
const ButtonWrapper = styled.TouchableOpacity`
  margin-bottom: ${props => props.bottomTabHeight + 50}px;
  margin-top: 50px;
  align-items: center;
  border-color: ${props =>
    props.buttonActive
      ? props.theme.colors.hospitalOwnerColor
      : props.theme.colors.gray5};
  border-width: 2px;
  padding-vertical: 15px;
  background-color: ${props =>
    props.buttonActive ? props.theme.colors.white : props.theme.colors.gray5};
`;
const SubmitButtonTitle = styled.Text`
  font-weight: bold;
  font-size: ${RFValue(15)}px;
  color: ${props =>
    props.buttonActive ? props.theme.colors.gray2 : props.theme.colors.white};
`;

export default HospitalRegistScreen;
