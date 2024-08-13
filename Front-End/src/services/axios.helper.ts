import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

const BASEURL = process.env.API_URL;

const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASEURL,
  headers: {
    "Content-Type": "application/json",
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
    if (error.body) return error.body;
    return Promise.reject(error);
  }
);

// Các phương thức helper để thực hiện các request HTTP
const get = async <T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<TResponse & { data: T }> => {
  const response = await axiosInstance.get<TResponse & { data: T }>(
    url,
    config
  );
  return response.data;
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

export { axiosInstance, get, post, patch, put, del };
