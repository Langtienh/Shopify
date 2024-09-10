"use server";

import { post, put } from "../axios.helper";
import { getConfigToken } from "../cookies/check-token";

export const updatePaymentMethod = async (
  data: PaymentMethodDTO,
  paymentMethodId: number
) => {
  const { configToken } = await getConfigToken();
  const res = await put(
    `/payment_methods/${paymentMethodId}`,
    data,
    configToken
  );
  return res;
};

export const delPaymentMethod = async () => {};

export const updateStatusPaymentMethod = async (
  status: boolean,
  paymentMethodId: number
) => {
  const { configToken } = await getConfigToken();
  const res = await put(
    `/payment_methods/update-status/${paymentMethodId}/${status}`,
    undefined,
    configToken
  );
  return res;
};

export const createPaymentMethod = async (data: PaymentMethodDTO) => {
  const { configToken } = await getConfigToken();
  const res = await post(`/payment_methods`, data, configToken);
  return res;
};
