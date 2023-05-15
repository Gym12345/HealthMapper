import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

// 진료과 선택을 통해 병원리스트를 가져오는 비동기 함수 _ 일반사용자
export const getHospitalList_medicalDepartment = createAsyncThunk(
  'hospital/getHospitalList_medicalDepartment',
  async ({department, userLatitude, userLongitude}) => {
    console.log(department, userLatitude, userLongitude);
    const response = await fetch(
      `http://localhost:8090/Health/Health1/MedicalDepartmentControllerForJson`,
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
  'hospital/submitHospitalInf',
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
      `http://localhost:8090/Health/Health1/HosOwnersRequestControllerForJson`,
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
    } else {
      console.log('병원 요청실패', resData);
      throw new Error(resData.message);
    }
  },
);

const initialState = {
  isLoading: false,
  error: null,
  healthArr: null, //서버를 통해 전달받은 병원정보
  distance: null,
  userLatitude: null, //사용자 현재 위도 위치
  userLongitude: null, //사용자 현재 경도 위치
  requestArr: null, //병원등록자가 관리자에게 요청한 자신의 병원정보
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
      //진료과선택에 따른 병원리스트 조회 요청
      .addCase(getHospitalList_medicalDepartment.pending, state => {
        state.error = null;
        state.isLoading = true;
      })
      //진료과선택에 따른 병원리스트 조회 성공
      .addCase(getHospitalList_medicalDepartment.fulfilled, (state, action) => {
        state.error = null;
        state.isLoading = false;
        state.healthArr = action.payload.healthArr;
      })
      //진료과선택에 따른 병원리스트 조회 거절
      .addCase(getHospitalList_medicalDepartment.rejected, (state, action) => {
        state.error = action.error;
        state.isLoading = false;
      })
      //관리자에게 병원 등록 요청
      .addCase(submitHospitalInfo.pending, state => {
        state.error = null;
        state.isLoading = true;
      })
      //관리자에게게 병원 등록 요청 성공
      .addCase(submitHospitalInfo.fulfilled, state => {
        state.error = null;
        state.isLoading = false;
      })
      //관리자에게 병원 등록 거절
      .addCase(submitHospitalInfo.rejected, (state, action) => {
        state.error = action.error;
        state.isLoading = false;
      });
  },
});

export const {setUserPosition} = hospitalSlice.actions;
export default hospitalSlice.reducer;
