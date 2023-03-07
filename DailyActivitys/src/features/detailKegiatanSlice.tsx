import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';
import axios from 'axios';
import {RootState} from '../app/store';
import {KegiatanModel} from '../model/KegiatanModel';

const header = {
  headers: {
    'Content-Type': 'multipart/form-data',
    Accept: 'application/json',
  },
};

export const getListKegiatan = createAsyncThunk(
  'kegiatan/getKegiatan',
  async (idKegiatan: any, {rejectWithValue}) =>
    await axios
      .get(`/list-kegiatan/${idKegiatan}`)
      .then(function (response) {
        console.log(response.data.data);
        // console.log('ini id',idKegiatan);
        return response.data.data;
      })
      .catch(function (error) {
        console.log('data gagal', error.response);
        return rejectWithValue(error.response);
      }),
);

export const postCreateKegiatan = createAsyncThunk(
  'kegiatan/postKegiatan',
  async (formData: any, {rejectWithValue}) =>
    await axios
      .post(`/create-kegiatan`, formData, header)
      .then(function (response) {
        console.log(response.data.data);
        return response.data.data;
      })
      .catch(function (error) {
        console.log('data gagal', error.response);
        return rejectWithValue(error.response);
      }),
);

export const postUpdateKegiatan = createAsyncThunk(
  'kegiatan/updateKegiatan',
  async (
    {formData, idKegiatan}: {formData: any; idKegiatan: any},
    {rejectWithValue},
  ) =>
    await axios
      .post(`/update-kegiatan/${idKegiatan}`, formData, header)
      .then(function (response) {
        console.log(response.data.data);
        return response.data.data;
      })
      .catch(function (error) {
        console.log('data gagal', error.response.data);
        return rejectWithValue(error.response);
      }),
);

export const postUpdateKegiatanCeklist = createAsyncThunk(
  'ceklist/updateCeklist',
  async (
    {formData, idKegiatan}: {formData: any; idKegiatan: any},
    {rejectWithValue},
  ) =>
    await axios
      .post(`/update-ceklis-kegiatan/${idKegiatan}`, formData, header)
      .then(function (response) {
        console.log(response.data.data);
        return response.data.data;
      })
      .catch(function (error) {
        console.log('data gagal', error.response.data);
        return rejectWithValue(error.response);
      }),
);

export const postDeleteKegiatan = createAsyncThunk(
  'ceklist/DeleteCeklist',
  async (idKegiatan: any, {rejectWithValue}) =>
    await axios
      .post(`/delete-kegiatan/${idKegiatan}`, header)
      .then(function (response) {
        console.log(response.data.data);
        return idKegiatan;
      })
      .catch(function (error) {
        console.log('data gagal', error.response.data);
        // return rejectWithValue(error.response);
      }),
);

const kegiatanAdapter = createEntityAdapter<KegiatanModel>({
  // Assume IDs are stored in a field other than `book.id`
  selectId: kegiatan => kegiatan.id,
  // Keep the "all IDs" array sorted based on book titles
  // sortComparer: (a, b) => a.nama_Kegiatan.localeCompare(b.nama_suplier),
});

export const kegiatanSlice = createSlice({
  name: 'kegiatan',
  initialState: kegiatanAdapter.getInitialState({
    dataKegiatan: kegiatanAdapter.getInitialState(),
    dataKegiatanDetail: [],
    isPending: false,
    isSuccess: false,
    isError: false,
  }),
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getListKegiatan.pending, (state, action) => {
      (state.isPending = true),
        (state.isSuccess = false),
        (state.isError = false);
    });
    builder.addCase(getListKegiatan.fulfilled, (state, action) => {
      (state.isPending = false),
        (state.isSuccess = true),
        (state.isError = false),
        (state.dataKegiatan = action.payload);
      kegiatanAdapter.setAll(state, action.payload);
    });
    builder.addCase(getListKegiatan.rejected, (state, action) => {
      (state.isPending = false),
        (state.isSuccess = false),
        (state.isError = true);
    });

    // create
    builder.addCase(postCreateKegiatan.pending, (state, action) => {
      (state.isPending = true),
        (state.isSuccess = false),
        (state.isError = false);
    });
    builder.addCase(postCreateKegiatan.fulfilled, (state, action) => {
      (state.isPending = false),
        (state.isSuccess = true),
        (state.isError = false),
        kegiatanAdapter.addOne(state, action.payload);
    });
    builder.addCase(postCreateKegiatan.rejected, (state, action) => {
      (state.isPending = false),
        (state.isSuccess = false),
        (state.isError = true);
    });

    // update
    builder.addCase(postUpdateKegiatan.pending, (state, action) => {
      (state.isPending = true),
        (state.isSuccess = false),
        (state.isError = false);
    });
    builder.addCase(postUpdateKegiatan.fulfilled, (state, action) => {
      (state.isPending = false),
        (state.isSuccess = true),
        (state.isError = false);
      kegiatanAdapter.updateOne(state, {
        id: action.payload.id,
        changes: action.payload,
      });
    });
    builder.addCase(postUpdateKegiatan.rejected, (state, action) => {
      (state.isPending = false),
        (state.isSuccess = false),
        (state.isError = true);
    });

    builder.addCase(postDeleteKegiatan.fulfilled, (state, action) => {
      (state.isPending = false),
        (state.isSuccess = true),
        (state.isError = false),
        kegiatanAdapter.removeOne(state, action.payload);
    });
  },
});

export default kegiatanSlice.reducer;
export const kegiatanSelectors = kegiatanAdapter.getSelectors<RootState>(
  state => state.kegiatan,
);
