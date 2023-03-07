import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../app/store';
import {PengingatModel} from '../model/PengingatModel';

const header = {
  headers: {
    'Content-Type': 'multipart/form-data',
    Accept: 'application/json',
  },
};

export const getListPengingat = createAsyncThunk(
  'pebgingat/getPengingat',
  async (userId:string, {rejectWithValue}) =>
    await axios
      .get(`/pengingat-list/${userId}`)
      .then(function (response) {
        console.log(response.data.data);
        return response.data.data;
      })
      .catch(function (error) {
        console.log('data gagal', error.response);
        return rejectWithValue(error.response);
      }),
);

export const postCreatePengingat = createAsyncThunk(
  'pengingat/postPengingat',
  async (formData:any, {rejectWithValue}) =>
    await axios
      .post('/create-pengingat', formData, header)
      .then(function (response) {
        console.log(response.data.data);
        return response.data.data;
      })
      .catch(function (error) {
        console.log('data gagal', error.response.data);
        return rejectWithValue(error.response);
      }),
);

export const postUpdatePengingat = createAsyncThunk(
  'pengingat/updatePengingat',
  async ({formData,pengingatId}:{formData:any, pengingatId:any}, {rejectWithValue}) =>
    await axios
      .post(`/edit-pengingat/${pengingatId}`, formData, header)
      .then(function (response) {
        console.log(response.data.data);
        return response.data.data;
      })
      .catch(function (error) {
        console.log('data gagal', error.response.data);
        return rejectWithValue(error.response);
      }),
);

const pengingatAdapter = createEntityAdapter<PengingatModel>({
  // Assume IDs are stored in a field other than `book.id`
  selectId: pengingat => pengingat.id,
  // Keep the "all IDs" array sorted based on book titles
  // sortComparer: (a, b) => a.nama_pengingat.localeCompare(b.nama_suplier),
});

export const pengingatSlice = createSlice({
  name: 'pengingat',
  initialState: pengingatAdapter.getInitialState({
    isPending: false,
    isSuccess: false,
    isError: false,
  }),
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getListPengingat.pending, (state, action) => {
      (state.isPending = true),
        (state.isSuccess = false),
        (state.isError = false);
    });
    builder.addCase(getListPengingat.fulfilled, (state, action) => {
      (state.isPending = false),
        (state.isSuccess = true),
        (state.isError = false)
        pengingatAdapter.setAll(state, action.payload);
    });
    builder.addCase(getListPengingat.rejected, (state, action) => {
      (state.isPending = false),
        (state.isSuccess = false),
        (state.isError = true);
    });

    // create
    builder.addCase(postCreatePengingat.pending, (state, action) => {
      (state.isPending = true),
        (state.isSuccess = false),
        (state.isError = false);
    });
    builder.addCase(postCreatePengingat.fulfilled, (state, action) => {
      (state.isPending = false),
        (state.isSuccess = true),
        (state.isError = false),
        pengingatAdapter.addOne(state, action.payload);
    });
    builder.addCase(postCreatePengingat.rejected, (state, action) => {
      (state.isPending = false),
        (state.isSuccess = false),
        (state.isError = true);
    });

    // create
    builder.addCase(postUpdatePengingat.pending, (state, action) => {
      (state.isPending = true),
        (state.isSuccess = false),
        (state.isError = false);
    });
    builder.addCase(postUpdatePengingat.fulfilled, (state, action) => {
      (state.isPending = false),
        (state.isSuccess = true),
        (state.isError = false),
        pengingatAdapter.updateOne(state, {id: action.payload.id, changes: action.payload});
    });
    builder.addCase(postUpdatePengingat.rejected, (state, action) => {
      (state.isPending = false),
        (state.isSuccess = false),
        (state.isError = true);
    });

  },
});

export default pengingatSlice.reducer;
export const pengingatSelectors = pengingatAdapter.getSelectors<RootState>(
  state => state.pengingat,
);
