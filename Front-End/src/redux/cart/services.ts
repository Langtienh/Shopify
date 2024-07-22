import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api/v1" }),
  tagTypes: ["Cart"],
  endpoints: (builder) => ({
    getCart: builder.query<CartResponse, void>({
      query: () => "/cart-item",
      providesTags: [{ type: "Cart" as const, id: "LIST" }],
    }),
    addCartItem: builder.mutation<unknown, number>({
      query: (productId) => {
        return {
          url: "/cart-item",
          method: "POST",
          body: {
            productId,
          },
        };
      },
      invalidatesTags: () => [{ type: "Cart" as const, id: "LIST" }],
    }),
    deleteCartItem: builder.mutation<unknown, number>({
      query: (id) => {
        return {
          url: `/cart-item/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: () => [{ type: "Cart" as const, id: "LIST" }],
    }),
    addQuantity: builder.mutation<unknown, Omit<CartItemDTO, "productId">>({
      query: (item) => {
        return {
          url: `/cart-item/${item.id}`,
          method: "PUT",
          body: {
            quantity: item.quantity + 1,
          },
        };
      },
      invalidatesTags: () => [{ type: "Cart" as const, id: "LIST" }],
    }),
    subQuantity: builder.mutation<unknown, Omit<CartItemDTO, "productId">>({
      query: (item) => {
        return {
          url: `/cart-item/${item.id}`,
          method: "PUT",
          body: {
            quantity: item.quantity - 1,
          },
        };
      },
      invalidatesTags: () => [{ type: "Cart" as const, id: "LIST" }],
    }),
    deleteListItem: builder.mutation<unknown, number[]>({
      query: (listId) => {
        return {
          url: `/cart-item/${listId.toString()}`,
          method: "DELETE",
        };
      },
      invalidatesTags: () => [{ type: "Cart" as const, id: "LIST" }],
    }),
    deleteCart: builder.mutation<unknown, void>({
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
