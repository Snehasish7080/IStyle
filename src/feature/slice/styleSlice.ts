import type {PayloadAction} from '@reduxjs/toolkit';
import {createSlice} from '@reduxjs/toolkit';
import {IStyle} from '../../interface/styleInterface';
import {styleApi} from '../services/style';
export interface StyleState {
  userStyle: IStyle[];
}

const initialState: StyleState = {
  userStyle: [],
};

export const styleSlice = createSlice({
  name: 'styleSlice',
  initialState,
  reducers: {
    setUserStyle: (state, action: PayloadAction<IStyle[]>) => {
      state.userStyle = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addMatcher(
      styleApi.endpoints.getUserStyles.matchFulfilled,
      (state, {payload}) => {
        if (payload.success) {
          if (payload.data) {
            state.userStyle = [...state.userStyle, ...payload.data];
          }
        }
      },
    );
  },
});

// Action creators are generated for each case reducer function
export const {setUserStyle} = styleSlice.actions;
export default styleSlice.reducer;
