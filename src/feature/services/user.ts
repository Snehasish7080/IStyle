import {API_BASE_URL} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

type userResponse = {
  data: {
    firstName: string;
    lastName: string;
    userName: string;
    isMobileVerified: boolean;
  };
  success: boolean;
  message: string;
};

type updateUserBody = {
  firstName?: string;
  lastName?: string;
  profilePic?: string;
  gender?: string;
  bio?: string;
};
type updateUserResponse = {
  success: boolean;
  message: string;
};

type getPictureUrlResponse = {
  data: {
    url: string;
    key: string;
  };
  success: boolean;
  message: string;
};

type uploadPictureBody = {
  url: string;
  body: Blob;
};

type updateUserMobileBody = {
  mobile: string;
};
type updateUserMobileResponse = {
  message: string;
  success: boolean;
};

type verifyUserMobileBody = {
  otp: string;
};

type verifyUserMobileResponse = {
  token: string;
  message: string;
  success: boolean;
};

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_BASE_URL}/auth`,
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
  tagTypes: ['User'],
  endpoints: build => ({
    getUser: build.query<userResponse, undefined>({
      query: () => '/user',
      providesTags: ['User'],
    }),
    getPictureUrl: build.query<getPictureUrlResponse, undefined>({
      query: () => '/user/picture/url',
    }),
    uploadPicture: build.mutation<undefined, uploadPictureBody>({
      query: body => {
        return {
          url: body.url,
          body: body.body,
          method: 'Put',
        };
      },
    }),
    updateUser: build.mutation<updateUserResponse, updateUserBody>({
      query: body => {
        return {
          url: '/user/update',
          method: 'Post',
          body,
        };
      },
      invalidatesTags: ['User'],
    }),
    updateUserMobile: build.mutation<
      updateUserMobileResponse,
      updateUserMobileBody
    >({
      query: body => {
        return {
          url: '/update/mobile',
          method: 'Post',
          body,
        };
      },
    }),

    verifyUserMobile: build.mutation<
      verifyUserMobileResponse,
      verifyUserMobileBody
    >({
      query: body => {
        return {
          url: '/verify/mobile',
          method: 'Post',
          body,
        };
      },
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useGetUserQuery,
  useUpdateUserMutation,
  useGetPictureUrlQuery,
  useUploadPictureMutation,
  useUpdateUserMobileMutation,
  useVerifyUserMobileMutation,
} = userApi;
