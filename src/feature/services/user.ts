import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {API_BASE_URL} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

type userResponse = {
  data: {
    firstName: string;
    lastName: string;
    userName: string;
  };
  success: boolean;
  message: string;
};

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({baseUrl: `${API_BASE_URL}/auth`}),
  tagTypes: ['User'],
  endpoints: build => ({
    getUser: build.query<userResponse, undefined>({
      query: () => {
        const headers: {Authorization: string} = {Authorization: ''};
        AsyncStorage.getItem('token')
          .then(value => {
            if (value) {
              console.log('value', value);
              headers.Authorization = value;
              console.log('headers', headers);
            }
          })
          .catch(e => {});

        console.log('headers', headers);
        return {
          url: '/user',
          headers: headers,
        };
      },
      transformResponse: (
        rawResult: {result: {response: userResponse}},
        meta,
      ) => rawResult.result.response,
    }),
  }),
});

export const {useGetUserQuery} = userApi;
