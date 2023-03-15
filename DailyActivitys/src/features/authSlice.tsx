import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {UserModel} from '../model/UserModel';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

axios.defaults.baseURL = 'http://192.168.91.12:8000/api';
const header = {
  headers: {
    'Content-Type': 'multipart/form-data',
    Accept: 'application/json',
  },
};

axios.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = 'Bearer ' + token;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

export const postDataRegister = createAsyncThunk(
  'register/postRegister',
  async (formData: any, {rejectWithValue}) =>
    // console.log('data masuk')
    await axios
      .post('/register', formData, header)
      .then(function (response) {
        console.log(response.data.token);
        AsyncStorage.setItem('email', response.data.email);
        AsyncStorage.setItem('token', response.data.token);
        AsyncStorage.setItem('name', response.data.name);
        AsyncStorage.setItem('email_verified_at',response.data.email_verified_at
        );
        AsyncStorage.setItem('user_id', '' + response.data.user_id);
        return response.data;
      })
      .catch(function (error) {
        console.log('data gagal', error.response.data.message);
        return rejectWithValue(error.response.data.message);
      }),
);

export const postDataLogin = createAsyncThunk(
  'login/postLogin',
  async (formData: any, {rejectWithValue}) =>
    await axios
      .post('/login', formData, header)
      .then(function (response) {
        console.log(response.data);
        AsyncStorage.setItem('email', response.data.email);
        AsyncStorage.setItem('name', response.data.name);
        AsyncStorage.setItem('token', response.data.token);
        AsyncStorage.setItem(
          'email_verified_at',
          response.data.email_verified_at,
        );
        AsyncStorage.setItem('user_id', '' + response.data.user_id);
        return response.data;
      })
      .catch(function (error) {
        console.log('data gagal', error.response.data.messages);
        return rejectWithValue(error.response.data.messages);
      }),
);

export const postDataLogout = createAsyncThunk(
  'logout/postLogout',
  async (formData: any, {rejectWithValue}) =>
    // console.log('data masuk')
    await axios
      .post('/logout', formData, header)
      .then(function (response) {
        AsyncStorage.removeItem('user_id');
        AsyncStorage.removeItem('email');
        AsyncStorage.removeItem('token');
        AsyncStorage.removeItem('email_verified_at');
        console.log(response.data);
        return response.data;
      })
      .catch(function (error) {
        console.log('data gagal', error.response.data.messages);
        AsyncStorage.removeItem('user_id');
        AsyncStorage.removeItem('email');
        AsyncStorage.removeItem('token');
        AsyncStorage.removeItem('email_verified_at');
        // return rejectWithValue(error.response.data.messages);
      }),
);

export const postUpdatePassword = createAsyncThunk(
  'password/updatePassword',
  async (formData: any, {rejectWithValue}) =>
    await axios
      .post('/update-password', formData, header)
      .then(function (response) {
        console.log(response.data.message);
        // return response.data;
      })
      .catch(function (error) {
        // console.log('data gagal', error.response.data.message)
        // return rejectWithValue(error.response.data.messages);
      }),
);

export const postForgotPassword = createAsyncThunk(
  'password/updatePassword',
  async (email: any, {rejectWithValue}) =>
    await axios
      .get(`/reset-password/${email}`, header)
      .then(function (response) {
        console.log(response.data.message);
        // return response.data;
      })
      .catch(function (error) {
        // console.log('data gagal', error.response.data.message)
        // return rejectWithValue(error.response.data.messages);
      }),
);

export const cekLogin = createAsyncThunk(
  'login/cekLogin',
  async (email:any, {rejectWithValue}) =>
    await axios
      .post(`/ceklogin/${email}`, header)
      .then(function (response) {
        // console.log(response.data.messages);
        if (response.data.messages === 'guest') {
          AsyncStorage.removeItem('user_id');
          AsyncStorage.removeItem('email');
          AsyncStorage.removeItem('token');
          AsyncStorage.removeItem('email_verified_at');
        }
        if (response.data.messages === 'auth') {
          AsyncStorage.setItem('email_verified_at', ''+response.data.data.email_verified_at)
          console.log('data',response.data.data.email_verified_at)
        }
      })
      .catch(function (error) {
        console.log('data gagal', error.response.data);
        // return rejectWithValue(error.response.data.messages);
      }),
);

export const getVerifikasiAkun = createAsyncThunk(
  'akun/verifikasiAkun',
  async (email: any, {rejectWithValue}) =>
    await axios
      .get(`/verifikasi-akun/${email}`, header)
      .then(function (response) {
        console.log(response.data.messages);
        // return response.data;
      })
      .catch(function (error) {
        console.log('data gagal', error.response.data);
        // return rejectWithValue(error.response.data.messages);
      }),
);

export const resetState = createAsyncThunk('reset/resetState', async () => {
  return 'success';
});

export interface DataState {
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;
  isRedirect: boolean;
  dataUser: UserModel;
  dataError: any;
  dataAuth: any;
  dataUpdateError: any;
}

const initialState: DataState = {
  isPending: false,
  isSuccess: false,
  isError: false,
  dataUser: {name: '', email: '', password: '', confirmPassword: ''},
  dataError: [],
  dataAuth: [],
  dataUpdateError: [],
  isRedirect: true,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers(builder) {
    // reset state
    builder.addCase(resetState.fulfilled, (state, action) => {
      (state.isPending = false),
        (state.isSuccess = false),
        (state.isError = false),
        (state.dataError = []),
        (state.isRedirect = false);
    });

    //Register
    builder.addCase(postDataRegister.pending, (state, action) => {
      (state.isPending = true),
        (state.isSuccess = false),
        (state.isRedirect = false),
        (state.isError = false);
    });
    builder.addCase(postDataRegister.fulfilled, (state, action) => {
      (state.isPending = false),
        (state.isSuccess = true),
        (state.isError = false),
        (state.isRedirect = true),
        (state.dataUser = action.payload);
    });
    builder.addCase(postDataRegister.rejected, (state, action) => {
      (state.isPending = false),
        (state.isSuccess = false),
        (state.isError = true),
        (state.isRedirect = false),
        (state.dataError = action.payload);
    });

    //Login
    builder.addCase(postDataLogin.pending, (state, action) => {
      (state.isPending = true),
        (state.isSuccess = false),
        (state.isRedirect = false),
        (state.isError = false);
    });
    builder.addCase(postDataLogin.fulfilled, (state, action) => {
      (state.isPending = false),
        (state.isSuccess = true),
        (state.isError = false),
        (state.isRedirect = true),
        (state.dataUser = action.payload);
    });
    builder.addCase(postDataLogin.rejected, (state, action) => {
      (state.isPending = false),
        (state.isSuccess = false),
        (state.isError = true),
        (state.isRedirect = false),
        (state.dataError = action.payload);
    });

    builder.addCase(postDataLogout.fulfilled, (state, action) => {
      (state.isPending = false),
        (state.isSuccess = true),
        (state.isError = false),
        (state.isRedirect = true),
        (state.dataUser = action.payload);
    });
    builder.addCase(postDataLogout.rejected, (state, action) => {
      (state.isPending = false),
        (state.isSuccess = false),
        (state.isError = true),
        (state.isRedirect = true);
    });

    // update password
    builder.addCase(postUpdatePassword.pending, (state, action) => {
      (state.isPending = true),
        (state.isSuccess = false),
        (state.isRedirect = false),
        (state.isError = false);
    });

    builder.addCase(postUpdatePassword.fulfilled, (state, action) => {
      (state.isPending = false),
        (state.isSuccess = true),
        (state.isError = false),
        (state.dataUpdateError = []);
    });
    builder.addCase(postUpdatePassword.rejected, (state, action) => {
      (state.isPending = false),
        (state.isSuccess = false),
        (state.isError = true),
        (state.dataUpdateError = action.payload);
    });

    // cekLogin
    builder.addCase(cekLogin.fulfilled, (state, action) => {
      (state.isPending = false),
        (state.isSuccess = true),
        // (state.isRedirect = true),
        (state.isError = false);
    });
    builder.addCase(cekLogin.rejected, (state, action) => {
      (state.isPending = false),
        (state.isSuccess = false),
        // (state.isRedirect = false),
        (state.isError = true);
    });
  },
});

export default authSlice.reducer;
