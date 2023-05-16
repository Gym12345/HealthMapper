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

const initialState = {
  error: null,
  isRecordSubmitted: false,
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
      }),
});

export const {} = healthSlice.actions;
export default healthSlice.reducer;
