"use server";
import { get } from "../axios.helper";
import { getAddressDetail } from "../address.helper";
import { getToken, checkToken } from "../cookies";
import { converPriceToVN, formatDate } from "@/lib/utils2";

export const getInvoice = async (limit: number = 5, page: number = 1) => {
  await checkToken();
  const { token } = getToken();
  const res = await get<Page<OrderResponse>>(
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

export const getInvoiceDetailById = async (id: string | number) => {
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
  const address = getAddressDetail(order.data.address);
  const orderDate = formatDate(order.data.orderDate);
  return {
    order: { ...order.data, address, orderDate },
    orderDetail: orderDetail.data,
  };
};
export const getLatestInvoices = async () => {
  const res = await getInvoice();
  return res.invoices;
};

export const getOrderById = async (id: string | number) => {
  await checkToken();
  let { token } = getToken();

  const res = await get<OrderType>(`/orders/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const address = await getAddressDetail(res.data.address);
  return { ...res.data, address };
};

export const getOrderDetailById = async (id: string | number) => {
  await checkToken();
  let { token } = getToken();

  const res = await get<OrderDetailType[]>(`/order-details/order/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const getAllOrderByUserId = async () => {
  try {
    await checkToken();
    let { userId, token } = getToken();

    const res = await get<Page<OrderResponse>>(
      `/orders/user/${userId}?limit=100`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = res.data.result;
    // Sử dụng map để tạo ra một mảng các Promise
    const promises = data.map((item) => getOrderDetailById(item.id));

    // Sử dụng Promise.all để đợi tất cả các Promise hoàn thành
    const orderDetails = await Promise.all(promises);
    const firstItem = orderDetails.map((item) => item[0]);
    return { totalItem: res.data.totalItem, data, firstItem };
  } catch {
    return { totalItem: 0, data: [], firstItem: [] };
  }
};
