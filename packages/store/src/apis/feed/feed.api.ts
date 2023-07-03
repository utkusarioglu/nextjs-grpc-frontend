import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  PostsApiResponse,
  PostsApiParams,
  StoriesApiParams,
  StoriesApiResponse,
} from "./feed.api.types";

export const feedApi = createApi({
  reducerPath: "feedApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_V1_URL }),
  endpoints: (builder) => ({
    fetchPosts: builder.query<PostsApiResponse, PostsApiParams>({
      query: ({ offset, limit }) => ({
        url: "feed/posts",
        params: {
          offset,
          limit,
        },
      }),
    }),
    fetchStories: builder.query<StoriesApiResponse, StoriesApiParams>({
      query: ({ offset, limit }) => ({
        url: "feed/stories",
        params: {
          offset,
          limit,
        },
      }),
    }),
  }),
});

export const usePosts = feedApi.useFetchPostsQuery;
export const useStories = feedApi.useFetchStoriesQuery;
