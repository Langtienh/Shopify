import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const loveApi = createApi({
  reducerPath: "loveApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/v1" }),
  tagTypes: ["love"],
  endpoints: (builder) => ({
    getLove: builder.query<WishList[], void>({
      query: () => "/love",
      providesTags: [{ type: "love" as const, id: "ListLove" }],
    }),
    postLove: builder.mutation<unknown, number>({
      query: (productId) => {
        return {
          url: "/love",
          method: "POST",
          body: {
            productId,
          },
        };
      },
      invalidatesTags: () => [{ type: "love" as const, id: "ListLove" }],
    }),
    deleteLove: builder.mutation<unknown, number>({
      query: (id) => {
        return {
          url: `/love/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: () => [{ type: "love" as const, id: "ListLove" }],
    }),
  }),
});

export const { useDeleteLoveMutation, usePostLoveMutation, useGetLoveQuery } =
  loveApi;
