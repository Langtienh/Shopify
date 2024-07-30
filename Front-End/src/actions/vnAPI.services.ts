"use server";
import axios, { AxiosInstance } from "axios";
// hardcode
const BASEURL = process.env.API_CUSTOM;
const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASEURL,
  headers: {
    "Content-Type": "application/json",
  },
});

const get = async <T>(url: string): Promise<T> => {
  const response = await axiosInstance.get<T>(url);
  return response.data;
};
// tỉnh
export const getProvinceAll = async () => {
  try {
    const res = await get<ResponseSuccess<provinceType[]>>("provinces");
    const data = res.data;
    return data;
  } catch {
    return [];
  }
};

export const getProvinceByCode = async (
  code: string
): Promise<provinceType | null> => {
  try {
    const res = await get<ResponseSuccess<provinceType>>(`provinces/${code}`);
    const data = res.data;
    return data;
  } catch {
    return null;
  }
};
// huyện
export const getDistrictAll = async () => {
  try {
    const res = await get<ResponseSuccess<provinceType[]>>("districts");
    const data = res.data;
    return data;
  } catch {
    return [];
  }
};

export const getDistrictByCode = async (
  code: string
): Promise<provinceType | null> => {
  try {
    const res = await get<ResponseSuccess<provinceType>>(`districts/${code}`);
    const data = res.data;
    return data;
  } catch {
    return null;
  }
};

export const getDistrictByParentCode = async (
  parentCode: string
): Promise<districtType[]> => {
  try {
    const res = await get<ResponseSuccess<districtType[]>>(
      `districts?parentCode=${parentCode}`
    );
    const data = res.data;
    return data;
  } catch {
    return [];
  }
};
//xã
export const getWardtAll = async () => {
  try {
    const res = await get<ResponseSuccess<wardType[]>>("wards");
    const data = res.data;
    return data;
  } catch {
    return [];
  }
};

export const getWardtByCode = async (
  code: string
): Promise<wardType | null> => {
  try {
    const res = await get<ResponseSuccess<wardType>>(`wards/${code}`);
    const data = res.data;
    return data;
  } catch {
    return null;
  }
};

export const getWardByParentCode = async (
  parentCode: string
): Promise<wardType[]> => {
  try {
    const res = await get<ResponseSuccess<wardType[]>>(
      `wards?parentCode=${parentCode}`
    );
    const data = res.data;
    return data;
  } catch {
    return [];
  }
};

export const getAddressDetail = async (code: string) => {
  const wards = await getWardtByCode(code);
  if (wards) return wards.pathWithType;
  else return "Lỗi không tìm thấy địa chỉ";
};
