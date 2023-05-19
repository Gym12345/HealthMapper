import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

// 건강기록 저장 함수
export const submitHealthRecord = createAsyncThunk(
  'health/submitHealthRecord',
  async ({hcYear, hcMonth, hcDate, hcMemo, hcUser}) => {
    const response = await fetch(
      'http://172.30.1.59:8090/Health/Health1/HealthCareMemoCreateControllerForJson',
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          hcYear,
          hcMonth,
          hcDate,
          hcMemo,
          hcUser,
        }),
      },
    );

    // 서버에서 응답받은 데이터
    const resData = await response.json();

    if (resData.success) {
      console.log('성공: ' + resData.message);
      return resData;
    } else {
      console.log('실패: ' + resData.message);
      throw new Error(resData.message);
    }
  },
);

// 건강기록 조회 함수
export const getHealthRecord = createAsyncThunk(
  'health/getHealthRecord',
  async ({hcUser}) => {
    const response = await fetch(
      'http://172.30.1.59:8090/Health/Health1/HealthCareMemoListControllerForJson',
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          hcUser,
        }),
      },
    );

    const resData = await response.json();

    if (response.ok) {
      console.log(resData);
      return resData;
    } else {
      console.log('메모 조회 실패');
      throw new Error('네트워크 요청 실패');
    }
  },
);

const initialState = {
  error: null,
  isRecordSubmitted: false,
  isGettedHealthRecor: false,
  healthRecordArr: null, //서버를 통해 전달받은 유저 건강기록 정보
};

export const healthSlice = createSlice({
  name: 'health',
  initialState,
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(submitHealthRecord.pending, state => {
        state.error = null;
        state.isRecordSubmitted = false;
      })
      .addCase(submitHealthRecord.fulfilled, state => {
        state.error = null;
        state.isRecordSubmitted = true;
      })
      .addCase(submitHealthRecord.rejected, (state, action) => {
        state.error = action.error.message;
        state.isRecordSubmitted = false;
      })
      .addCase(getHealthRecord.pending, state => {
        state.error = null;
        state.isGettedHealthRecor = false;
      })
      .addCase(getHealthRecord.fulfilled, (state, action) => {
        state.error = action.error;
        state.isGettedHealthRecor = true;
        state.healthRecordArr = action.payload.hcareArr;
      })
      .addCase(getHealthRecord.rejected, (state, action) => {
        state.error = action.error.message;
        state.isGettedHealthRecor = false;
      }),
});

export const {} = healthSlice.actions;
export default healthSlice.reducer;
