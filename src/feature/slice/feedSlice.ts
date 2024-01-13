import type {PayloadAction} from '@reduxjs/toolkit';
import {createSlice} from '@reduxjs/toolkit';
import {cloneDeep, differenceWith, isEqual} from 'lodash';
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
    setFeedOnFollow: (state, action: PayloadAction<{userName: string}>) => {
      const temp = cloneDeep(state.userFeed);
      const updatedFeed = temp.map(x => {
        if (x.user.userName === action.payload.userName) {
          x.user.isFollowing = true;
        }
        return x;
      });
      state.userFeed = updatedFeed;
    },
    setFeedOnUnFollow: (state, action: PayloadAction<{userName: string}>) => {
      const temp = cloneDeep(state.userFeed);
      const updatedFeed = temp.map(x => {
        if (x.user.userName === action.payload.userName) {
          x.user.isFollowing = false;
        }
        return x;
      });
      state.userFeed = updatedFeed;
    },
  },
  extraReducers: builder => {
    builder.addMatcher(
      feedApi.endpoints.getUserFeed.matchFulfilled,
      (state, {payload}) => {
        if (payload.success) {
          if (payload.data) {
            const data = differenceWith(payload.data, state.userFeed, isEqual);
            state.userFeed = [...state.userFeed, ...data];
          }
        }
      },
    );
  },
});

// Action creators are generated for each case reducer function
export const {setUserFeed, setFeedOnFollow, setFeedOnUnFollow} =
  feedSlice.actions;
export default feedSlice.reducer;
