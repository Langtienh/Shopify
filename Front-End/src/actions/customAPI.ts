import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

const FE_URL = process.env.NEXTAUTH_URL;
const BASEURL = FE_URL ? FE_URL + "/api" : "http://localhost:3000/api";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASEURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Các phương thức helper để thực hiện các request HTTP
const get = async <T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<TResponse & { data: T }> => {
  try {
    const response = await axiosInstance.get<TResponse & { data: T }>(
      url,
      config
    );
    return response.data;
  } catch {
    // @ts-ignore
    return {};
  }
};

const post = async <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<TResponse & { data: T }> => {
  const response = await axiosInstance.post<TResponse & { data: T }>(
    url,
    data,
    config
  );
  return response.data;
};

const put = async <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<TResponse & { data: T }> => {
  const response = await axiosInstance.put<TResponse & { data: T }>(
    url,
    data,
    config
  );
  return response.data;
};

const patch = async <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<TResponse & { data: T }> => {
  const response = await axiosInstance.patch<TResponse & { data: T }>(
    url,
    data,
    config
  );
  return response.data;
};

const del = async <T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<TResponse & { data: T }> => {
  const response = await axiosInstance.delete<TResponse & { data: T }>(
    url,
    config
  );
  return response.data;
};

const httpCustom = { get, post, patch, put, del };
export default httpCustom;
