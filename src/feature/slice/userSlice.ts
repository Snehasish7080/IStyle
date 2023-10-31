import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../store';

export interface UserState {
  user: string;
}

const initialState: UserState = {
  user: '',
};

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<string>) => {
      state.user = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {setUser} = userSlice.actions;
export const selectUser = (state: RootState) => state.userSlice.user;
export default userSlice.reducer;
