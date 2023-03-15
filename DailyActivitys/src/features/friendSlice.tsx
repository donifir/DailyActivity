import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../app/store';

const header = {
  headers: {
    'Content-Type': 'multipart/form-data',
    Accept: 'application/json',
  },
};

export const getListFriend = createAsyncThunk(
  'friend/listFriend',
  async (userId:string, {rejectWithValue}) =>
    await axios
      .get(`/list-friends/${userId}`)
      .then(function (response) {
        console.log(response.data.data);
        return response.data.data;
      })
      .catch(function (error) {
        console.log('userid :',userId);
        console.log('data gagal', error.response);
        return rejectWithValue(error.response);
      }),
);

export const postCreateFriend = createAsyncThunk(
  'friend/createFriend',
  async ({email,userId}:{email:string,userId:string}, {rejectWithValue}) =>
    await axios
      .post(`/add-friends/${userId}`,{email}, header)
      // .post('/create-pengingat', formData, header)
      .then(function (response) {
        console.log(response.data.data);
        return response.data.data;
      })
      .catch(function (error) {
        console.log('data gagal', error.response.data.message);
        return rejectWithValue(error.response.data.message);
      }),
);

export const postDeleteFriend = createAsyncThunk(
  'friend/deleteFriend',
  async (friendId:any, {rejectWithValue}) =>
    await axios
      .post(`/delete-friends/${friendId}`, header)
      // .post('/create-pengingat', formData, header)
      .then(function (response) {
        console.log(response.data.data);
        return friendId;
      })
      .catch(function (error) {
        console.log('data gagal', error.response.data.message);
        return rejectWithValue(error.response.data.message);
      }),
);

type Friend = { id: string; name: string; email: string }

const friendAdapter = createEntityAdapter<Friend>({
  // Assume IDs are stored in a field other than `book.id`
  selectId: friend => friend.id,
  // Keep the "all IDs" array sorted based on book titles
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

export const friendSlice = createSlice({
  name: 'friend',
  initialState: friendAdapter.getInitialState({
    isPending: false,
    isSuccess: false,
    isError: false,
    dataError:[]
  }),
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getListFriend.pending, (state, action) => {
      (state.isPending = true),
        (state.isSuccess = false),
        (state.isError = false);
    });
    builder.addCase(getListFriend.fulfilled, (state, action) => {
      (state.isPending = false),
        (state.isSuccess = true),
        (state.isError = false)
        friendAdapter.setAll(state, action.payload);
    });
    builder.addCase(getListFriend.rejected, (state:any, action) => {
      (state.isPending = false),
        (state.isSuccess = false),
        (state.isError = true);
    });

    builder.addCase(postCreateFriend.pending, (state:any, action) => {
      (state.isPending = true),
        (state.isSuccess = false),
        (state.isError = false);
    });
    builder.addCase(postCreateFriend.fulfilled, (state:any, action) => {
      (state.isPending = false),
        (state.isSuccess = true),
        (state.isError = false)
        friendAdapter.addOne(state, action.payload);
        
    });
    builder.addCase(postCreateFriend.rejected, (state:any, action) => {
      (state.isPending = false),
        (state.isSuccess = false),
        (state.isError = true),
        state.dataError = action.payload
    });

    //delete
    builder.addCase(postDeleteFriend.pending, (state:any, action) => {
      (state.isPending = true),
        (state.isSuccess = false),
        (state.isError = false);
    });
    builder.addCase(postDeleteFriend.fulfilled, (state:any, action) => {
      (state.isPending = false),
        (state.isSuccess = true),
        (state.isError = false)
        friendAdapter.removeOne(state, action.payload);
        
    });
    builder.addCase(postDeleteFriend.rejected, (state:any, action) => {
      (state.isPending = false),
        (state.isSuccess = false),
        (state.isError = true),
        state.dataError = action.payload
    });

  },
});

export default friendSlice.reducer;
export const friendSelectors = friendAdapter.getSelectors<RootState>(
  state => state.friend,
);
