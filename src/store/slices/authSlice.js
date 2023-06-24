import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

//비동기 처리 로그인 API 요청함수 _ 로그인 경로3
export const login = createAsyncThunk(
  'auth/login',
  async ({userId, userPw, userClass}) => {
    const response = await fetch(
      'http://210.102.178.98:60005/Health1/Health1/LoginControllerForJson',
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

// 비동기처리 _ 회원가입
export const signUp = createAsyncThunk(
  'auth/signUp',
  async ({userId, userPw, userName, userClass}) => {
    const response = await fetch(
      'http://210.102.178.98:60005/Health1/Health1/SignUpControllerForJson',
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          userId,
          userPw,
          userName,
          userClass,
        }),
      },
    );

    // 서버에서 응답받은 데이터
    const resData = await response.json();

    if (resData.success) {
      //회원가입 성공하면 signUp.fulfilled진입
      console.log('회원가입 성공:', resData);
      return {userId, userName, userClass};
    } else {
      //회원가입 실패하면 signUp.rejected진입
      console.log('회원가입 실패:', resData);
      throw new Error(resData.message);
    }
  },
);

const initialState = {
  userId: null,
  userClass: null,
  userName: null,
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
      console.log(
        '게스트아이디 : ' + state.userId,
        '권한 : ' + state.userClass,
      );
    },
  },
  //Reducers, Actions related login
  extraReducers: builder => {
    //로그인
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

    //회원가입
    builder
      // 회원가입 요청
      .addCase(signUp.pending, state => {
        state.isSignedUp = false;
        state.error = null;
      })
      // 회원가입 성공
      .addCase(signUp.fulfilled, (state, action) => {
        state.userId = action.payload.userId;
        state.userName = action.payload.userName;
        state.userClass = action.payload.userClass;
        state.isSignedUp = true;
        state.error = null;
      })
      // 회원가입 실패
      .addCase(signUp.rejected, (state, action) => {
        state.isSignedUp = false;
        state.error = action.error.message;
      });
  },
});

export const {logout, guestLogin} = authSlice.actions;

export default authSlice.reducer;
