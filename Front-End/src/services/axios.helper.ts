import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

const BASEURL = process.env.API_URL;

const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASEURL, // Thay đổi URL này với API của bạn
  headers: {
    "Content-Type": "application/json",
    // Thêm các headers
  },
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Thêm token hoặc chỉnh sửa config trước khi gửi request
    // Ví dụ: config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Middleware
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    // Xử lý lỗi chung
    return Promise.reject(error);
  }
);

// Các phương thức helper để thực hiện các request HTTP
const get = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  const response = await axiosInstance.get<T>(url, config);
  return response.data;
};

const post = async <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<T> => {
  const response = await axiosInstance.post<T>(url, data, config);
  return response.data;
};

const put = async <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<T> => {
  const response = await axiosInstance.put<T>(url, data, config);
  return response.data;
};

const patch = async <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<T> => {
  const response = await axiosInstance.patch<T>(url, data, config);
  return response.data;
};

const del = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  const response = await axiosInstance.delete<T>(url, config);
  return response.data;
};

export { axiosInstance, get, post, patch, put, del };
