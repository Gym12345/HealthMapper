import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

//비동기 처리 로그인 API 요청함수 _ 로그인 경로3
export const login = createAsyncThunk(
  'auth/login',
  async ({userId, userPw, userClass}) => {
    const response = await fetch(
      'http://172.30.1.75:8090/Health/Health1/LoginController',
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          userId,
          userPw,
          userClass,
        }),
      },
    );

    // 서버에서 응답받은 데이터
    const resData = await response.json();
    console.log(resData);

    if (resData.success) {
      //로그인 성공하면 login.fulfilled진입
      console.log('로그인 성공:', resData);
      return {userId, userClass};
    } else {
      //로그인 실패하면 login.rejected진입
      console.log('로그인 실패:', resData);
      throw new Error(resData.message);
    }
  },
);

const initialState = {
  userId: null,
  userClass: null,
  isLoggedIn: false,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    //로그아웃 기능
    logout(state) {
      state.userId = null;
      state.userClass = null;
      state.isLoggedIn = false;
    },
    //게스트 로그인 기능 _ 게스트는 로그아웃 기능을 이용 못하기에 isLoggedIn변수를 false로 설정 (게스트는 isLoggedIn 상태값 사용안함.)
    guestLogin(state) {
      state.userId = 'guest';
      state.userClass = 'guest';
      state.isLoggedIn = false;
    },
  },
  //Reducers, Actions related login
  extraReducers: builder => {
    builder
      //로그인 요청 _ 로그인 경로2
      .addCase(login.pending, state => {
        state.isLoggedIn = false;
        state.error = null;
      })
      //로그인 성공 _ 로그인 경로4
      .addCase(login.fulfilled, (state, action) => {
        state.userId = action.payload.userId;
        state.userClass = action.payload.userClass;
        state.isLoggedIn = true;
        state.error = null;
      })
      //로그인 실패 _ 로그인 경로4
      .addCase(login.rejected, (state, action) => {
        state.isLoggedIn = false;
        state.error = action.error.message;
      });
  },
});

export const {logout, guestLogin} = authSlice.actions;

export default authSlice.reducer;
