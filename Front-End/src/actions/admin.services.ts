"use server";

import checkToken from "@/app/api/v1/_lib/check-token";
import getToken from "@/app/api/v1/_lib/getToken";
import { get } from "./axios.helper";
import { converPriceToVN } from "@/lib/ultils";

const getInvoice = async (limit: number = 5, page: number = 1) => {
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
  return res.data;
};
const getUser = async (limit: number = 5, page: number = 1) => {
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
  return res.data;
};

export const fetchCardData = async () => {
  const users = await getUser(1);
  const invoices = await getInvoice(1);

  return {
    numberOfCustomers: users.totalItem,
    numberOfInvoices: invoices.totalItem,
    totalPendingInvoices: 0,
    totalPaidInvoices: 0,
  };
};

export const fetchLatestInvoices = async () => {
  const invoicesData = await getInvoice();
  return invoicesData.result.map((item) => {
    const totalPrice = converPriceToVN(item.totalPrice, "đ");
    return { ...item, totalPrice };
  });
};
