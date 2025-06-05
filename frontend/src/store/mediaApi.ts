import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const mediaApi = createApi({
  reducerPath: 'mediaApi',
  //replace baseurl with env BASE_URL
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000/api/' }),
  endpoints: (builder) => ({
    getMediaItems: builder.query<any[], string>({
      query: (workspaceId: string) => `media-items?workspace=${workspaceId}`,
    }),
  }),
});

export const { useGetMediaItemsQuery } = mediaApi;
