import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api/token" }),
  tagTypes: ["Cart"],
  endpoints: (builder) => ({
    getCart: builder.query<CartItemResponse[], void>({
      query: () => "/cart-item",
      providesTags: (result) => {
        if (result) {
          const final = [
            ...result.map((item) => ({ type: "Cart" as const, id: item.id })),
            { type: "Cart" as const, id: "LIST" },
          ];
          return final;
        }
        return [{ type: "Cart" as const, id: "LIST" }];
      },
    }),
    addCartItem: builder.mutation<any, CartItemDTO>({
      query: (item) => {
        return {
          url: "/cart-item",
          method: "POST",
          body: {
            type: "POST",
            item,
          },
        };
      },
      invalidatesTags: () => [{ type: "Cart" as const, id: "LIST" }],
    }),
    deleteCartItem: builder.mutation<any, number>({
      query: (id) => {
        return {
          url: `/cart-item/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: () => [{ type: "Cart" as const, id: "LIST" }],
    }),
    addQuantity: builder.mutation<any, number>({
      query: (item) => {
        return {
          url: `/cart-item/${item}`,
          method: "PUT",
          body: {
            type: "ADD",
          },
        };
      },
      invalidatesTags: () => [{ type: "Cart" as const, id: "LIST" }],
    }),
    subQuantity: builder.mutation<any, number>({
      query: (item) => {
        return {
          url: `/cart-item/${item}`,
          method: "PUT",
          body: {
            type: "SUB",
          },
        };
      },
      invalidatesTags: () => [{ type: "Cart" as const, id: "LIST" }],
    }),
    deleteListItem: builder.mutation<any, number[]>({
      query: (listId) => {
        return {
          url: `/cart-item`,
          method: "POST",
          body: {
            type: "DELETE",
            list: listId,
          },
        };
      },
      invalidatesTags: () => [{ type: "Cart" as const, id: "LIST" }],
    }),
    deleteCart: builder.mutation<any, void>({
      query: () => {
        return {
          url: `/cart-item`,
          method: "DELETE",
        };
      },
      invalidatesTags: () => [{ type: "Cart" as const, id: "LIST" }],
    }),
  }),
});

export const {
  useGetCartQuery,
  useAddCartItemMutation,
  useDeleteCartItemMutation,
  useDeleteCartMutation,
  useAddQuantityMutation,
  useSubQuantityMutation,
  useDeleteListItemMutation,
} = cartApi;
