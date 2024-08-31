"use server";

import { post, put } from "../axios.helper";
import { getConfigToken } from "../cookies";

export const updateInvoiceStatus = async (id: string, status: OrderStatus) => {
  const { configToken } = await getConfigToken();
  const _id = id.replace("INV0", "");
  const res = await put(
    `/orders/update-status/${_id}?status=${status}`,
    undefined,
    configToken
  );
  return res;
};

export const createInvoice = async (data: {}) => {
  const { userId, configToken } = await getConfigToken();
  const res = await post("/orders", { ...data, userId }, configToken);
  return res;
};

export const createInvoiceByVNPay = async (data: {}, totalPrice: number) => {
  const { userId, configToken } = await getConfigToken();
  const res = await post<{ code: string; paymentUrl: string }>(
    `/payments/create-payment?amount=${totalPrice}&bankCode=NCB`,
    { ...data, userId: userId, paymentMethodId: 1 },
    configToken
  );
  return res.data.paymentUrl;
};
