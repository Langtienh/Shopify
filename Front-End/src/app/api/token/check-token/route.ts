import { post, get } from "@/actions/axios.helper";
import { auth } from "@/auth/auth";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// env
const EXP_REFRESH_TOKEN = +process.env.REFRESH_TOKEN! || 604800;
const EXP_TOKEN = +process.env.TOKEN! || 36000;

export async function GET(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const session = await auth();
  try {
    // chưa đăng nhập => /login
    if (!session?.refreshToken || !session.token) {
      const newUrl = new URL(`/login?callbackUrl=${path}`, req.nextUrl.origin);
      return NextResponse.redirect(newUrl);
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
    const refreshTokenNow = cookies().get("REFRESH_TOKEN")?.value;
    const tokenNow = cookies().get("TOKEN")?.value;
    const userId = cookies().get("USER_ID")?.value;
    return NextResponse.json(
      {
        message: "sucsess",
        token: tokenNow,
        refreshToken: refreshTokenNow,
        userId,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: "error" }, { status: 500 });
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
  console.log(res.message);
  setToken(res.data.token);
  setRefreshToken(res.data.refreshToken);
};
