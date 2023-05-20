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

// userInfoScreen에서 쓰이는 자신이 작성한 리뷰 조회 컨트롤러
export const checkMyReview_NormalUSer = createAsyncThunk(
  'review/checkMyReview_NormalUSer',
  async ({userId}) => {
    const response = await fetch(
      `http://localhost:8090/Health/Health1/ShowMyReviewNormalControllerForJson`,
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({userId}),
      },
    );

    const resData = await response.json();
    console.log(resData);

    if (response.ok) {
      console.log('내 리뷰조회 성공');
      return resData;
    } else {
      console.log('내 리뷰조회 실패');
      throw new Error('네트워크 요청 실패');
    }
  },
);

// MyReviewScreen에서 리뷰 카드 클릭 시 그에 해당 하는 병원 정보 get 컨트롤러
export const getHospitalByReview = createAsyncThunk(
  'review/getHospitalByReview',
  async ({hName}) => {
    const response = await fetch(
      `http://172.30.1.57:8090/Health/Health1/ShowHospitalByReviewForJson`,
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({hName}),
      },
    );

    const resData = await response.json();
    console.log(resData);

    if (response.ok) {
      return resData;
    } else {
      throw new Error('네트워크 요청 실패');
    }
  },
);

initialState = {
  error: null,
  isReviewRegistered: false,
  isReviesGetted: false,
  isCheckedMyReview: false,
  isGettedHosByReview: false,
  reviewArr: [], //리뷰관련 정보 state
  myReviewArr: [], //내리뷰 관련 정보 state
  hospitalArrByReview: [], //리뷰에 해당되는 병원 정보 state
};

export const reviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {},
  extraReducers: builder =>
    builder
      //리뷰 등록_reviewRegistScreen
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
      //병원 리뷰 get_hospitalDetailScreen
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
      })
      //내 리뷰 조회_userInfoScreen(NorMalUser)
      .addCase(checkMyReview_NormalUSer.pending, state => {
        state.error = null;
        state.isCheckedMyReview = false;
      })
      .addCase(checkMyReview_NormalUSer.fulfilled, (state, action) => {
        state.error = null;
        state.isCheckedMyReview = true;
        state.myReviewArr = action.payload.myReviewArr;
      })
      .addCase(checkMyReview_NormalUSer.rejected, (state, action) => {
        state.error = action.error;
        state.isCheckedMyReview = false;
      })
      //리뷰에 해당되는 병원 조회_myReviewScreen(NorMalUser)
      .addCase(getHospitalByReview.pending, state => {
        state.error = null;
        state.isGettedHosByReview = false;
      })
      .addCase(getHospitalByReview.fulfilled, (state, action) => {
        state.error = null;
        state.isGettedHosByReview = true;
        state.hospitalArrByReview = action.payload.hospitalArrByReview;
        console.log(state.hospitalArrByReview);
      })
      .addCase(getHospitalByReview.rejected, (state, action) => {
        state.error = action.error;
        state.isGettedHosByReview = false;
      }),
});

export const {} = reviewSlice.actions;
export default reviewSlice.reducer;
