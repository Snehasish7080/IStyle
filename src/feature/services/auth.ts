import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {API_BASE_URL} from '@env';

type loginBody = {
  email: string;
  password: string;
};

type loginResponse = {
  token: string;
  success: boolean;
  message: string;
};

type verifyBody = {
  otp: string;
  token: string;
};

type verifyResponse = {
  token: string;
  success: boolean;
  message: string;
};
export const authApi = createApi({
  baseQuery: fetchBaseQuery({baseUrl: `${API_BASE_URL}/auth`}),
  tagTypes: ['Auth'],
  endpoints: build => ({
    login: build.mutation<loginResponse, loginBody>({
      query: body => ({
        url: '/login',
        method: 'Post',
        body,
      }),
    }),
    verify: build.mutation<verifyResponse, verifyBody>({
      query: body => ({
        url: '/verify',
        method: 'Post',
        headers: {
          Authorization: body.token,
        },
        body: {
          otp: body.otp,
        },
      }),
    }),
  }),
});

export const {useLoginMutation, useVerifyMutation} = authApi;
