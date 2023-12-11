import {configureStore} from '@reduxjs/toolkit';
import {authApi} from './services/auth';
import {feedApi} from './services/feed';
import {styleApi} from './services/style';
import {tagApi} from './services/tags';
import {userApi} from './services/user';
import feedSlice from './slice/feedSlice';
import styleSlice from './slice/styleSlice';
import userSlice from './slice/userSlice';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [tagApi.reducerPath]: tagApi.reducer,
    [styleApi.reducerPath]: styleApi.reducer,
    [feedApi.reducerPath]: feedApi.reducer,
    userSlice: userSlice,
    styleSlice: styleSlice,
    feedSlice: feedSlice,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat([
      authApi.middleware,
      userApi.middleware,
      tagApi.middleware,
      styleApi.middleware,
      feedApi.middleware,
    ]),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
