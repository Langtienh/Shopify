import { post } from "@/services/axios.helper";
import { auth } from "@/auth/auth";
import { cookies } from "next/headers";

// env
const EXP_REFRESH_TOKEN = +process.env.REFRESH_TOKEN! || 604800;
const EXP_TOKEN = +process.env.TOKEN! || 36000;

export default async function checkToken() {
  const session = await auth();
  try {
    if (!session?.refreshToken || !session.token) {
      return false;
    }
    const refreshToken = cookies().get("REFRESH_TOKEN")?.value;
    const token = cookies().get("TOKEN")?.value;

    // chưa cập nhật token từ authjs (lần đầu request)
    if (!refreshToken) {
      const newRefreshToken = session?.refreshToken;
      if (newRefreshToken) setRefreshToken(newRefreshToken);

      // token trong auth hết hạn => refresh
      const exp_token = session?.exp_token as number;
      if (Date.now() > exp_token) await RefreshToken(newRefreshToken);
      else setToken(session?.token);
    }
    // token hết hạn => refresh
    else if (!token) await RefreshToken(refreshToken);
    // cập nhật id
    const id = session?.user?.id;
    if (id)
      cookies().set({
        name: "USER_ID",
        value: id.toString(),
        path: "/",
      });
    return true;
  } catch {
    return false;
  }
}

const setToken = (token: string) => {
  cookies().set({
    name: "TOKEN",
    value: token,
    maxAge: EXP_TOKEN,
    secure: true,
    httpOnly: true,
    path: "/",
  });
};

const setRefreshToken = (refreshToken: string) => {
  cookies().set({
    name: "REFRESH_TOKEN",
    value: refreshToken,
    maxAge: EXP_REFRESH_TOKEN,
    secure: true,
    httpOnly: true,
    path: "/",
  });
  const authToken = cookies().get("authjs.session-token")?.value as string;
  cookies().set({
    name: "authjs.session-token",
    value: authToken,
    maxAge: EXP_REFRESH_TOKEN,
    secure: true,
    httpOnly: true,
    path: "/",
  });
};

const RefreshToken = async (refreshToken: string) => {
  const res = await post<RefreshTokenResponse>("/users/refreshToken", {
    refreshToken,
  });
  setToken(res.data.token);
  setRefreshToken(res.data.refreshToken);
};
