import { RequestSetCookies } from "@/app/api/cookies/route";
import axios, { AxiosInstance } from "axios";

// key
const key = process.env.NO_SECRET || "";
const token_time = +(process.env.TOKEN || "0");
const refresh_token_time = +(process.env.REFRESH_TOKEN || "0");
const BASE_URL = process.env.FRONT_END_URL || "http://localhost:3000";

// axios helpper
const http: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
export const setToken = async (token: string) => {
  const body: RequestSetCookies = {
    key,
    name: "token",
    value: token,
    httpOnly: true,
    secure: true,
    expires: token_time,
  };
  try {
    const res = await http.post("/api/cookies", body);
    return res;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const setRefreshToken = async (refreshToken: string) => {
  const body: RequestSetCookies = {
    key,
    name: "refreshToken",
    value: refreshToken,
    httpOnly: true,
    expires: refresh_token_time,
    secure: true,
  };
  try {
    const res = await http.post("/api/cookies", body);

    return res;
  } catch (error) {
    return Promise.reject(error);
  }
};
