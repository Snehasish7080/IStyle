import type {PayloadAction} from '@reduxjs/toolkit';
import {createSlice} from '@reduxjs/toolkit';
import {IUser} from '../../interface/userInterface';
import {userApi} from '../services/user';
export interface UserState {
  user: IUser | undefined;
}

const initialState: UserState = {
  user: undefined,
};

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addMatcher(
      userApi.endpoints.getUser.matchFulfilled,
      (state, {payload}) => {
        if (payload.success) {
          state.user = payload.data;
        }
      },
    );
  },
});

// Action creators are generated for each case reducer function
export const {setUser} = userSlice.actions;
export default userSlice.reducer;
