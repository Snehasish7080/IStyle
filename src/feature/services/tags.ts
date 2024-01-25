import AsyncStorage from '@react-native-async-storage/async-storage';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {ITag} from '../../interface/tagInterface';
import {API_BASE_URL} from '../../utils/appConfig';

type tagResponse = {
  data: ITag[];
  success: boolean;
  message: string;
};

export const tagApi = createApi({
  reducerPath: 'tagApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_BASE_URL}/auth/tag`,
    prepareHeaders: async (headers, {endpoint}) => {
      if (endpoint !== 'uploadPicture') {
        try {
          const token = await AsyncStorage.getItem('token');

          if (Boolean(token)) {
            headers.set('authorization', token as string);
          }
          return headers;
        } catch (error) {}
      }
    },
  }),
  tagTypes: ['Tag'],
  endpoints: build => ({
    getAllTags: build.query<tagResponse, undefined>({
      query: () => '/all',
    }),
  }),
});

export const {useGetAllTagsQuery} = tagApi;
