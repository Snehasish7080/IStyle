import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

type loginBody = {
  mobile: string;
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
  baseQuery: fetchBaseQuery({baseUrl: 'http://192.168.1.38:3000/auth'}),
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
