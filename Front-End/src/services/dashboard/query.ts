"use server";
import { get } from "../axios.helper";
import { getAllBrands } from "../brand";
import { getAllCategory } from "../category";
import { getInvoice } from "../invoice";
import { getPaymentMethods } from "../payment-method";
import { getUser } from "../user";

export const getCrud = async (query: string) => {
  const res = await get<Page<OrderResponse>>(`/enpoint?query=${query}`);

  return res;
};
export const getCardData = async () => {
  const [users, invoices] = await Promise.all([getUser(1), getInvoice(1)]);
  return {
    numberOfCustomers: users.totalItem,
    numberOfInvoices: invoices.totalItem,
    totalPendingInvoices: 0,
    totalPaidInvoices: 0,
  };
};

export const getMore = async () => {
  const [categories, brands, paymentMethods] = await Promise.all([
    getAllCategory(),
    getAllBrands(),
    getPaymentMethods(),
  ]);
  return { categories, brands, paymentMethods };
};
