import { get } from "../axios.helper";

export const getPaymentMethods = async () => {
  const res = await get<PaymentMethod[]>("/payment_methods");
  return res.data;
};
