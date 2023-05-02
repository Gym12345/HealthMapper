import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import Geolocation from '@react-native-community/geolocation';

// 현재 위치의 위도와 경도 가져오기
const getCurrentPosition = () => {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      position => resolve(position),
      error => {
        console.log(error);
        reject(
          '앱을 사용하기 위해서는 위치 정보를 사용해야 합니다. 설정에서 위치 정보를 켜주세요.',
        );
      },
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  });
};

// 신체부위 선택을 통해 병원리스트를 가져오는 비동기 함수
export const getHospitalList_bodyPart = createAsyncThunk(
  'hospital/getHospitalList_bodyPart',
  async selectedValue => {
    //현재 위치 저장
    const position = await getCurrentPosition();
    console.log(position);

    const response = await fetch(
      `http://localhost:8090/Health/Health1/BodyPartsController`,
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          part: selectedValue,
          userLatitude: position.coords.latitude, //현재 위치 위도
          userLongitude: position.coords.longitude, //현재 위치 경도
        }),
      },
    );

    if (response.ok) {
      const resData = await response.json();

      console.log(resData);
      return resData;
    } else {
      throw new Error('네트워크 요청 실패');
    }
  },
);

// 진료과 선택을 통해 병원리스트를 가져오는 비동기 함수
export const getHospitalList_medicalDepartment = createAsyncThunk(
  'hospital/getHospitalList_medicalDepartment',
  async selectedValue => {
    //현재 위치 저장
    const position = await getCurrentPosition();
    console.log(position);
    const response = await fetch(
      `http://localhost:8090/Health/Health1/MedicalDepartmentController`,
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          department: selectedValue,
          userLatitude: position.coords.latitude, //현재 위치 위도
          userLongitude: position.coords.longitude, //현재 위치 경도
        }),
      },
    );

    if (response.ok) {
      const resData = await response.json();
      console.log(resData);
      return resData;
    } else {
      throw new Error('네트워크 요청 실패');
    }
  },
);

const initialState = {
  error: null,
  healthArr: null,
  distance: null,
};

// getHospitalList_BodyPart와 getHospitalList_MedicalDepartment 같은 상태를 정의하기에 하나의 buulder로
export const hospitalSlice = createSlice({
  name: 'hospital',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      //신체부위선택에 따른 병원리스트 조회 요청
      .addCase(getHospitalList_bodyPart.pending, state => {
        state.error = null;
      })
      //신체부위선택에 따른 병원리스트 조회 성공
      .addCase(getHospitalList_bodyPart.fulfilled, (state, action) => {
        state.error = null;
        state.healthArr = action.payload.healthArr;
      })
      //신체부위선택에 따른 병원리스트 조회 거절
      .addCase(getHospitalList_bodyPart.rejected, (state, action) => {
        state.error = action.error;
      })
      //진료과선택에 따른 병원리스트 조회 요청
      .addCase(getHospitalList_medicalDepartment.pending, state => {
        state.error = null;
      })
      //진료과선택에 따른 병원리스트 조회 성공
      .addCase(getHospitalList_medicalDepartment.fulfilled, (state, action) => {
        state.error = null;
        state.healthArr = action.payload.healthArr;
      })
      //진료과선택에 따른 병원리스트 조회 거절
      .addCase(getHospitalList_medicalDepartment.rejected, (state, action) => {
        state.error = action.error;
      });
  },
});

export const {} = hospitalSlice.actions;
export default hospitalSlice.reducer;
