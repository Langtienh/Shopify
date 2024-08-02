"use server";

import checkToken from "@/app/api/v1/_lib/check-token";
import getToken from "@/app/api/v1/_lib/getToken";
import { get, put } from "./axios.helper";
import { converPriceToVN, formatDate } from "@/lib/ultils";
import { getAddressDetail } from "./vnAPI.services";

export const fetchInvoice = async (limit: number = 5, page: number = 1) => {
  await checkToken();
  const { token } = getToken();
  const res = await get<PageResponse<OrderResponse>>(
    `/orders?page=${page}&limit=${limit}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = res.data.result.map((item) => {
    const totalPrice = converPriceToVN(item.totalPrice, "đ");
    const id = `INV0${item.id}`;
    return { ...item, totalPrice, id };
  });

  return { totalItem: res.data.totalItem, invoices: data };
};

export const changeInvoiceStatus = async (
  invoice: OrderResponse,
  status: OrderStatus
) => {
  let id = `${invoice.id}`;
  id = id.replace("INV0", "");
  await checkToken();
  const { token } = getToken();
  const res = await put<PageResponse<OrderResponse>>(`/orders/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const fetchInvoiceDetail = async (id: string | number) => {
  let _id = `${id}`;
  _id = _id.replace("INV0", "");
  await checkToken();
  const { token } = getToken();
  const order = await get<OrderResponse>(`/orders/${_id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const orderDetail = await get<OrderDetailType[]>(
    `/order-details/order/${_id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const address = await getAddressDetail(order.data.address);
  const orderDate = formatDate(order.data.orderDate);
  return {
    order: { ...order.data, address, orderDate },
    orderDetail: orderDetail.data,
  };
};

export const fetchUser = async (limit: number = 5, page: number = 1) => {
  await checkToken();
  const { token } = getToken();
  const res = await get<PageResponse<UserResponse>>(
    `/users?page=${page}&limit=${limit}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const result = res.data.result.map((user) => ({
    ...user,
    id: `USER0${user.id}`,
  }));
  return { ...res.data, result };
};

export const fetchCardData = async () => {
  const users = await fetchUser(1);
  const invoices = await fetchInvoice(1);

  return {
    numberOfCustomers: users.totalItem,
    numberOfInvoices: invoices.totalItem,
    totalPendingInvoices: 0,
    totalPaidInvoices: 0,
  };
};

export const fetchLatestInvoices = async () => {
  const res = await fetchInvoice();
  return res.invoices;
};
