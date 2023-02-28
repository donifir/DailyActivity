import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {UserModel} from '../model/UserModel';
import axios from 'axios';

axios.defaults.baseURL = 'http://192.168.91.12:8000/api';
const header = {
  headers: {
    'Content-Type': 'multipart/form-data',
    Accept: 'application/json',
  },
};

export const postDataRegister = createAsyncThunk(
  'register/postRegister',
  async (formData: any, {rejectWithValue}) =>
    // console.log('data masuk')
    await axios
      .post('/register', formData, header)
      .then(function (response) {
        console.log(response.data);
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
    // console.log('data masuk')
    await axios
      .post('/login', formData, header)
      .then(function (response) {
        console.log(response.data);
        return response.data;
      })
      .catch(function (error) {
        console.log('data gagal', error.response.data.messages)
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
        console.log(response.data);
        return response.data;
      })
      .catch(function (error) {
        console.log('data gagal', error.response.data.messages)
        return rejectWithValue(error.response.data.messages);
      }),
);

export interface DataState {
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;
  isRedirect: boolean;
  dataUser: UserModel;
  dataError: any;
}

const initialState: DataState = {
  isPending: false,
  isSuccess: false,
  isError: false,
  dataUser: {name: '', email: '', password: '', confirmPassword: ''},
  dataError: [],
  isRedirect: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers(builder) {
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
  },
});

export default authSlice.reducer;