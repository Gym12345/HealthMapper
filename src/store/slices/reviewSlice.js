import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

export const reviewRegist = createAsyncThunk(
  'review/regist',
  async ({hName, userId, hrComment, hrRate}) => {
    const response = await fetch(
      `http://localhost:8090/Health/Health1/HospitalReviewInsertControllerForJson`,
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

// hospitalDetailScreen에서 쓰이는 병원에 해당하는 조회컨트롤러
export const getReview = createAsyncThunk(
  'review/getReview',
  async selectedHospitalName => {
    const response = await fetch(
      `http://localhost:8090/Health/Health1/HospitalReviewListControllerForJson`,
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          hName: selectedHospitalName,
        }),
      },
    );

    const resData = await response.json();
    console.log(resData);
    if (response.ok) {
      console.log('리뷰호출 성공');
      return resData;
    } else {
      console.log('리뷰호출 실패');
      throw new Error(error);
    }
  },
);

initialState = {
  error: null,
  isReviewRegistered: false,
  isReviesGetted: false,
  reviewArr: [], //리뷰관련 정보 state
};

export const reviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(reviewRegist.pending, state => {
        state.error = null;
        state.isReviewRegistered = false;
      })
      .addCase(reviewRegist.fulfilled, state => {
        state.error = null;
        state.isReviewRegistered = true;
      })
      .addCase(reviewRegist.rejected, (state, action) => {
        state.error = action.error.message;
        state.isReviewRegistered = false;
      })
      .addCase(getReview.pending, state => {
        state.error = null;
      })
      .addCase(getReview.fulfilled, (state, action) => {
        state.error = null;
        state.isReviesGetted = true;
        state.reviewArr = action.payload.reviewArr;
      })
      .addCase(getReview.rejected, (state, action) => {
        state.error = action.error.message;
        state.isReviesGetted = false;
      }),
});

export const {} = reviewSlice.actions;
export default reviewSlice.reducer;
