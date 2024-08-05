"use server";
import { get } from "../axios.helper";
import { getInvoice } from "../invoice";
import { getUser } from "../user/get";

export const getCrud = async (query: string) => {
  const res = await get<Page<OrderResponse>>(`/enpoint?query=${query}`);

  return res;
};
export const getCardData = async () => {
  const users = await getUser(1);
  const invoices = await getInvoice(1);

  return {
    numberOfCustomers: users.totalItem,
    numberOfInvoices: invoices.totalItem,
    totalPendingInvoices: 0,
    totalPaidInvoices: 0,
  };
};
