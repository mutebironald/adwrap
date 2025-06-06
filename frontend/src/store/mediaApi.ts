import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const mediaApi = createApi({
  reducerPath: "mediaApi",
  //replace baseurl with env BASE_URL
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.NEXT_PUBLIC_BASE_URL}` }),
  endpoints: (builder) => ({
    getMediaItems: builder.query<any[], string>({
      query: (workspaceId: string) => `/?workspace=${workspaceId}`,
    }),

    getWorkspaceDetails: builder.query({
      query: (workspaceId: string) =>
        `/workspaces?workspace=${workspaceId}`,
    }),

    saveWorkspace: builder.mutation({
      query: (workspaceData) => {
        return {
          url: "/workspaces",
          method: "POST",
          body: {
            name: workspaceData.businessName,
            email: workspaceData.email,
            location: workspaceData.location,
            address: workspaceData.location,
          },
        };
      },
    }),

    saveMediaItem: builder.mutation({
      query: (mediaData) => {
        const workspaceId = localStorage.getItem("workspaceId");
        return {
          url: "/",
          method: "POST",
          body: {
            ...mediaData,
            type: mediaData.type.toLowerCase(),
            workspaceId,
          },
        };
      },
    }),
  }),
});

export const {
  useGetMediaItemsQuery,
  useGetWorkspaceDetailsQuery,
  useSaveWorkspaceMutation,
  useSaveMediaItemMutation,
} = mediaApi;
