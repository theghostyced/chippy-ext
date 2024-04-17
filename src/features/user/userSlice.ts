import { createSlice } from '@reduxjs/toolkit';
import { type UserType } from '~utils/types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { sendToBackground } from '@plasmohq/messaging';

export type UserTypeStore = {
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
} & UserType;

export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
  const resp = await sendToBackground({
    name: 'user',
    body: {},
  });
  return resp;
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    loading: 'idle',
  } as UserTypeStore,
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchUser.fulfilled, (_state, action) => {
      return action.payload;
    });
  },
});

export default userSlice.reducer;
