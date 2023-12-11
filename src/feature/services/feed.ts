import {API_BASE_URL} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {IFeed} from '../../interface/feedInterface';

type feedResponse = {
  data: IFeed[];
  success: boolean;
  message: string;
};

export const feedApi = createApi({
  reducerPath: 'feedApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_BASE_URL}/auth/feed`,
    prepareHeaders: async (headers, {endpoint}) => {
      try {
        const token = await AsyncStorage.getItem('token');

        if (Boolean(token)) {
          headers.set('authorization', token as string);
        }
        return headers;
      } catch (error) {}
    },
  }),
  tagTypes: ['Feed'],
  endpoints: build => ({
    getUserFeed: build.query<feedResponse, undefined>({
      query: () => '/',
    }),
  }),
});

export const {useGetUserFeedQuery} = feedApi;
