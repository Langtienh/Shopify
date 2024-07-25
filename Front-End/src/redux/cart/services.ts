import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/v1" }),
  tagTypes: ["Cart"],
  endpoints: (builder) => ({
    getCart: builder.query<CartResponse, void>({
      query: () => "/cart-item",
      providesTags: [{ type: "Cart" as const, id: "ListCart" }],
    }),
    addCartItem: builder.mutation<number, number>({
      query: (productId) => {
        return {
          url: "/cart-item",
          method: "POST",
          body: {
            productId,
          },
        };
      },
      invalidatesTags: () => [{ type: "Cart" as const, id: "ListCart" }],
    }),
    deleteCartItem: builder.mutation<unknown, number>({
      query: (id) => {
        return {
          url: `/cart-item/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: () => [{ type: "Cart" as const, id: "ListCart" }],
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
      invalidatesTags: () => [{ type: "Cart" as const, id: "ListCart" }],
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
      invalidatesTags: () => [{ type: "Cart" as const, id: "ListCart" }],
    }),
    deleteListItem: builder.mutation<unknown, number[]>({
      query: (listId) => {
        return {
          url: `/cart-item/${listId.toString()}`,
          method: "DELETE",
        };
      },
      invalidatesTags: () => [{ type: "Cart" as const, id: "ListCart" }],
    }),
    deleteCart: builder.mutation<unknown, void>({
      query: () => {
        return {
          url: `/cart-item`,
          method: "DELETE",
        };
      },
      invalidatesTags: () => [{ type: "Cart" as const, id: "ListCart" }],
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
