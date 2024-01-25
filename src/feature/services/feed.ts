import AsyncStorage from '@react-native-async-storage/async-storage';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {IFeed} from '../../interface/feedInterface';
import {API_BASE_URL} from '../../utils/appConfig';

type feedResponse = {
  data: IFeed[];
  success: boolean;
  message: string;
};

type feedRequest = {
  cursor?: string;
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
    getUserFeed: build.query<feedResponse, feedRequest>({
      query: body => ({
        url: '/',
        method: 'Get',
        params: {
          cursor: body?.cursor,
        },
      }),
    }),
  }),
});

export const {useGetUserFeedQuery, useLazyGetUserFeedQuery} = feedApi;
