import {configureStore} from '@reduxjs/toolkit';
import {authApi} from './services/auth';
import {tagApi} from './services/tags';
import {userApi} from './services/user';
import userSlice from './slice/userSlice';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [tagApi.reducerPath]: tagApi.reducer,
    userSlice: userSlice,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat([
      authApi.middleware,
      userApi.middleware,
      tagApi.middleware,
    ]),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
