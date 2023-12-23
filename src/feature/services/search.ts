import {API_BASE_URL} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

type searchResponse = {
  data: {
    userName: string;
    tag: string;
    hashtag: string;
    userPic: string;
  }[];
  message: string;
  success: boolean;
};

export const searchApi = createApi({
  reducerPath: 'searchApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_BASE_URL}/auth/search`,
    prepareHeaders: async headers => {
      try {
        const token = await AsyncStorage.getItem('token');

        if (Boolean(token)) {
          headers.set('authorization', token as string);
        }
        return headers;
      } catch (error) {}
    },
  }),
  tagTypes: ['Search'],
  endpoints: build => ({
    getSearchByText: build.query<searchResponse, string>({
      query: body => `/${body}`,
    }),
  }),
});

export const {useGetSearchByTextQuery} = searchApi;
