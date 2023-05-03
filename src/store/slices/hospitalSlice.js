import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

// 신체부위 선택을 통해 병원리스트를 가져오는 비동기 함수
export const getHospitalList_bodyPart = createAsyncThunk(
  'hospital/getHospitalList_bodyPart',
  async ({part, userLatitude, userLongitude}) => {
    const response = await fetch(
      `http://localhost:8090/Health/Health1/BodyPartsController`,
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          part, //사용자가 선택한 신체부위
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

// 진료과 선택을 통해 병원리스트를 가져오는 비동기 함수
export const getHospitalList_medicalDepartment = createAsyncThunk(
  'hospital/getHospitalList_medicalDepartment',
  async ({department, userLatitude, userLongitude}) => {
    console.log(department, userLatitude, userLongitude);
    const response = await fetch(
      `http://localhost:8090/Health/Health1/MedicalDepartmentController`,
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

const initialState = {
  error: null,
  healthArr: null, //서버를 통해 전달받은 병원정보
  distance: null,
  userLatitude: null, //사용자 현재 위도 위치
  userLongitude: null, //사용자 현재 경도 위치
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

export const {setUserPosition} = hospitalSlice.actions;
export default hospitalSlice.reducer;
