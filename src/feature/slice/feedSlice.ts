import type {PayloadAction} from '@reduxjs/toolkit';
import {createSlice} from '@reduxjs/toolkit';
import {IFeed} from '../../interface/feedInterface';
import {feedApi} from '../services/feed';
export interface FeedState {
  userFeed: IFeed[];
}

const initialState: FeedState = {
  userFeed: [],
};

export const feedSlice = createSlice({
  name: 'feedSlice',
  initialState,
  reducers: {
    setUserFeed: (state, action: PayloadAction<IFeed[]>) => {
      state.userFeed = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addMatcher(
      feedApi.endpoints.getUserFeed.matchFulfilled,
      (state, {payload}) => {
        if (payload.success) {
          if (payload.data) {
            state.userFeed = payload.data;
          }
        }
      },
    );
  },
});

// Action creators are generated for each case reducer function
export const {setUserFeed} = feedSlice.actions;
export default feedSlice.reducer;
