import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import config from '../../../apiKey';

const API_KEY = config.apiKey;

// 진료과 선택을 통해 병원리스트를 가져오는 비동기 함수 _ 일반사용자
export const getHospitalList_medicalDepartment = createAsyncThunk(
  'hospital/getHospitalList_medicalDepartment',
  async ({department, userLatitude, userLongitude}) => {
    console.log(department, userLatitude, userLongitude);
    const response = await fetch(
      `http://${API_KEY}/Health1/Health1/MedicalDepartmentControllerForJson`,
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          department, //사용자가 선택한 진료과
          userLatitude, //현재 위치 위도
          userLongitude, //현재 위치 경도
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

// 병원 등록 요청 비동기 함수 _ 병원 등록자
export const submitHospitalInfo = createAsyncThunk(
  'hospital/submitHospitalInfo',
  async ({
    reqName, //요청받은 병원이름
    reqAddress, //요청받은 병원주소
    reqDomain, //요청받은 병원도메인
    reqDescription, //요청받은 병원설명
    reqImg, //요청받은 병원사진
    reqPart, //요청받은 병원 관련신체부위
    reqDepartment, //요청받은 병원 관련진료과
    reqLatitude, //요청받은 병원 위도
    reqLongitude, //요청받은 병원 경도
  }) => {
    const response = await fetch(
      `http://${API_KEY}/Health1/Health1/HosOwnersRequestControllerForJson`,
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          reqName,
          reqAddress,
          reqDomain,
          reqDescription,
          reqImg,
          reqPart,
          reqDepartment,
          reqLatitude,
          reqLongitude,
        }),
      },
    );
    // 서버에서 응답받은 데이터
    const resData = await response.json();
    if (response.ok) {
      console.log('병원 요청성공:', resData);
      return resData;
    } else {
      console.log('병원 요청실패', resData);
      throw new Error(resData.message);
    }
  },
);

// 병원 조회 비동기 함수 _ 병원 소유자
export const getMyHospitalInfo = createAsyncThunk(
  'hospital/getMyHospitalInfo',
  async ({hName}) => {
    const response = await fetch(
      `http://${API_KEY}/Health1/Health1/OneHospitalInfoControllerForJson`,
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({hName}),
      },
    );
    // 서버에서 응답받은 데이터
    const resData = await response.json();
    if (response.ok) {
      console.log('병원 조회성공:', resData);
      return resData;
    } else {
      console.log('병원 조회실패', resData);
      throw new Error('네트워크 요청 실패');
    }
  },
);

const initialState = {
  isLoading: false,
  isCheckedHospitalInfo: false,
  error: null,
  healthArr: null, //서버를 통해 전달받은 병원정보
  distance: null,
  userLatitude: null, //사용자 현재 위도 위치
  userLongitude: null, //사용자 현재 경도 위치
  myHospitalName: null, //병원등록자가 병원 등록 요청한 병원이름
  myHospitalInfo: null, //자신의 병원 정보
};

// getHospitalList_BodyPart와 getHospitalList_MedicalDepartment 같은 상태를 정의하기에 하나의 buulder로
export const hospitalSlice = createSlice({
  name: 'hospital',
  initialState,
  //현재 사용자 위치 state저장 action
  reducers: {
    setUserPosition: (state, action) => {
      state.userLatitude = action.payload.userLatitude;
      state.userLongitude = action.payload.userLongitude;
    },
  },
  extraReducers: builder => {
    builder
      //진료과선택에 따른 병원리스트 get
      .addCase(getHospitalList_medicalDepartment.pending, state => {
        state.error = null;
        state.isLoading = true;
        console.log('1');
      })
      .addCase(getHospitalList_medicalDepartment.fulfilled, (state, action) => {
        state.error = null;
        state.isLoading = false;
        state.healthArr = action.payload.healthArr;
        console.log('2');
      })
      .addCase(getHospitalList_medicalDepartment.rejected, (state, action) => {
        state.error = action.error;
        state.isLoading = false;
        console.log('3');
      })
      //관리자에게 병원 등록 요청
      .addCase(submitHospitalInfo.pending, state => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(submitHospitalInfo.fulfilled, (state, action) => {
        state.error = null;
        state.isLoading = false;
        state.myHospitalName = action.payload.reqName; // 요청한 병원 이름 state변수에 저장 _ 병원등록자가 자신의 병원 조회에 쓰이는 변수
      })
      .addCase(submitHospitalInfo.rejected, (state, action) => {
        state.error = action.error;
        state.isLoading = false;
      })
      //자신의 병원 get _ 병원소유자
      .addCase(getMyHospitalInfo.pending, state => {
        state.error = null;
        state.isCheckedHospitalInfo = false;
      })
      .addCase(getMyHospitalInfo.fulfilled, (state, action) => {
        state.error = null;
        state.isCheckedHospitalInfo = true;
        state.myHospitalInfo = action.payload.OneHealthArrJson; // 자신의 병원 정보
      })
      .addCase(getMyHospitalInfo.rejected, (state, action) => {
        state.error = action.error;
        state.isCheckedHospitalInfo = false;
      });
  },
});

export const {setUserPosition} = hospitalSlice.actions;
export default hospitalSlice.reducer;
