import {API_BASE_URL} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {ILink} from '../../interface/linkInterface';
import {IStyle} from '../../interface/styleInterface';
import {ITag} from '../../interface/tagInterface';

type getUploadStyleUrlResponse = {
  data: {
    style: {
      url: string;
      key: string;
    };
    links: {
      url: string;
      key: string;
    }[];
  };
  success: boolean;
  message: string;
};
type getUploadStyleUrlRequest = {
  linkCount: number;
};

type uploadStylePictureBody = {
  url: string;
  body: Blob;
};

type createStyleRequest = {
  image: string;
  links: ILink[];
  tags: string[];
  hashtags: string[];
};
type createStyleResponse = {
  success: boolean;
  message: string;
};

type getUserStylesResponse = {
  data: IStyle[];
  message: string;
  success: boolean;
};

type getUserStyleRequest = {
  cursor?: string;
};

type getUserStyleByUserNameRequest = {
  userName: string;
  cursor?: string;
};

type markTrendRequest = {
  id: string;
};
type markTrendResponse = {
  message: string;
  success: boolean;
};

export const styleApi = createApi({
  reducerPath: 'styleApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_BASE_URL}/auth/style`,
    prepareHeaders: async (headers, {endpoint}) => {
      if (endpoint !== 'uploadStylePicture') {
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
  tagTypes: ['Style'],
  endpoints: build => ({
    getStyleUploadUrl: build.mutation<
      getUploadStyleUrlResponse,
      getUploadStyleUrlRequest
    >({
      query: body => {
        return {
          url: '/upload-url',
          method: 'Post',
          body,
        };
      },
    }),
    uploadStylePicture: build.mutation<undefined, uploadStylePictureBody>({
      query: body => {
        return {
          url: body.url,
          body: body.body,
          method: 'Put',
        };
      },
    }),
    createStyle: build.mutation<createStyleResponse, createStyleRequest>({
      query: body => {
        return {
          url: '/create',
          method: 'Post',
          body,
        };
      },
      invalidatesTags: ['Style'],
    }),
    getUserStyles: build.query<getUserStylesResponse, getUserStyleRequest>({
      query: body => ({
        url: '/all',
        params: {...body},
      }),
      providesTags: ['Style'],
    }),
    getUserStylesByUserName: build.query<
      getUserStylesResponse,
      getUserStyleByUserNameRequest
    >({
      query: body => ({
        url: `/${body.userName}`,
        params: {
          cursor: body.cursor,
        },
      }),
    }),

    markTrend: build.mutation<markTrendResponse, markTrendRequest>({
      query: body => ({
        url: '/mark-trend',
        body,
        method: 'Post',
      }),
    }),
    unmarkTrend: build.mutation<markTrendResponse, markTrendRequest>({
      query: body => ({
        url: '/unmark-trend',
        body,
        method: 'Post',
      }),
    }),
  }),
});

export const {
  useGetStyleUploadUrlMutation,
  useUploadStylePictureMutation,
  useCreateStyleMutation,
  useGetUserStylesQuery,
  useLazyGetUserStylesQuery,
  useGetUserStylesByUserNameQuery,
  useLazyGetUserStylesByUserNameQuery,
  useMarkTrendMutation,
  useUnmarkTrendMutation,
} = styleApi;
