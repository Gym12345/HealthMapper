import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

// 건강기록 저장 함수
export const submitHealthRecord = createAsyncThunk(
  'health/submitHealthRecord',
  async ({hcYear, hcMonth, hcDate, hcMemo, hcUser}) => {
    const response = await fetch(
      'http://localhost:8090/Health/Health1/HealthCareMemoCreateControllerForJson',
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
      'http://localhost:8090/Health/Health1/HealthCareMemoListControllerForJson',
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

// 건강기록 삭제 함수
export const deleteHealthRecord = createAsyncThunk(
  'health/deleteHealthRecord',
  async ({hcId}) => {
    const response = await fetch(
      'http://localhost:8090/Health/Health1/HealthCareMemoDeleteControllerForJson',
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          hcId,
        }),
      },
    );

    const resData = await response.json();
    console.log(resData.success);

    if (resData.success) {
      return resData;
    } else {
      console.log('메모 삭제 실패:' + resData.success);
      throw new Error('네트워크 요청 실패');
    }
  },
);

const initialState = {
  error: null,
  isRecordSubmitted: false,
  isGettedHealthRecord: false,
  isDeletedHealthRecord: false,
  healthRecordArr: null, //서버를 통해 전달받은 유저 건강기록 정보
};

export const healthSlice = createSlice({
  name: 'health',
  initialState,
  reducers: {},
  extraReducers: builder =>
    builder
      //건강기록 저장 액션
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
      //건강기록 조회 액션
      .addCase(getHealthRecord.pending, state => {
        state.error = null;
        state.isGettedHealthRecord = false;
      })
      .addCase(getHealthRecord.fulfilled, (state, action) => {
        state.error = action.error;
        state.isGettedHealthRecord = true;
        state.healthRecordArr = action.payload.hcareArr;
      })
      .addCase(getHealthRecord.rejected, (state, action) => {
        state.error = action.error.message;
        state.isGettedHealthRecord = false;
      })
      //건강기록 삭제 액션
      .addCase(deleteHealthRecord.pending, state => {
        state.error = null;
        state.isDeletedHealthRecord = false;
      })
      .addCase(deleteHealthRecord.fulfilled, (state, action) => {
        state.error = action.error;
        state.isDeletedHealthRecord = true;
      })
      .addCase(deleteHealthRecord.rejected, (state, action) => {
        state.error = action.error.message;
        state.isDeletedHealthRecord = false;
      }),
});

export const {} = healthSlice.actions;
export default healthSlice.reducer;
