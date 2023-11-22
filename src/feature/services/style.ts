import {API_BASE_URL} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {ILink} from '../../interface/linkInterface';
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
};
type createStyleResponse = {
  success: boolean;
  message: string;
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
    }),
  }),
});

export const {
  useGetStyleUploadUrlMutation,
  useUploadStylePictureMutation,
  useCreateStyleMutation,
} = styleApi;
