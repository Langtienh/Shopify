import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

const BASEURL = process.env.NEXT_PUBLIC_API_ENDPOINT;

const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASEURL,
  headers: {
    "Content-Type": "multipart/form-data",
    "Accept-Language": "vi",
  },
});

// Middleware
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    const data = error.response.data;
    if (data) return Promise.reject({ isError: true, ...data });
    return Promise.reject(error);
  }
);

export const postFormData = async <T>(
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
