import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

export const reviewRegist = createAsyncThunk(
  'review/regist',
  async ({hName, userId, hrComment, hrRate}) => {
    const response = await fetch(
      `http://localhost:8090/Health/Health1/HospitalReviewInsertController`,
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          hName,
          userId,
          hrComment,
          hrRate,
        }),
      },
    );

    const resData = await response.json();
    if (response.ok) {
      console.log('응답 메시지: ' + resData.message);
      return resData;
    } else {
      console.log('응답 메시지: ' + resData.message);
      throw new Error(resData.message);
    }
  },
);

initialState = {
  error: null,
  isReviewRegistered: false,
  reviewArr: null, //리뷰관련 정보 state
};

export const reviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(reviewRegist.pending, state => {
        state.error = null;
      })
      .addCase(reviewRegist.fulfilled, state => {
        state.error = null;
        state.isReviewRegistered = true;
      })
      .addCase(reviewRegist.rejected, (state, action) => {
        state.error = action.error.message;
        state.isReviewRegistered = false;
      }),
});

export const {} = reviewSlice.actions;
export default reviewSlice.reducer;
