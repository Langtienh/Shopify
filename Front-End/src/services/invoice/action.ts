"use server";

import checkToken from "@/app/api/v1/_lib/check-token";
import getToken from "@/app/api/v1/_lib/getToken";
import { post, put } from "../axios.helper";

export const updateInvoiceStatus = async (
  invoice: OrderResponse,
  status: OrderStatus
) => {
  let id = `${invoice.id}`;
  id = id.replace("INV0", "");
  await checkToken();
  const { token } = getToken();
  const res = await put<Page<OrderResponse>>(`/orders/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createInvoice = async (data: {}) => {
  try {
    await checkToken();
    const { userId, token } = getToken();
    await post(
      "/orders",
      { ...data, userId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    throw error;
  }
};

export const createInvoiceByVNPay = async (data: {}, totalPrice: number) => {
  try {
    await checkToken();
    let { userId, token } = getToken();

    const res = await post<{ code: string; paymentUrl: string }>(
      `/payments/create-payment?amount=${totalPrice}&bankCode=NCB`,
      { ...data, userId: userId, paymentMethodId: 1 },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data.paymentUrl;
  } catch (error) {
    throw error;
  }
};
