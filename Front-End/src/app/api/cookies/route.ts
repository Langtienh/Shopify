import { NextResponse } from "next/server";

const secret = process.env.NO_SECRET!;
import { cookies } from "next/headers";

export type RequestSetCookies = {
  key: string;
  name: string;
  value: string;
  httpOnly?: boolean;
  secure?: boolean;
  path?: string;
  expires?: number;
};
// api xét cookies
export async function POST(request: Request) {
  const res = (await request.json()) as RequestSetCookies;
  if (!(res.key === secret))
    return NextResponse.json(
      {
        message: "Không có quyền truy cập",
      },
      { status: 401 }
    );
  if (!res.name || !res.value)
    return NextResponse.json(
      {
        message: "Không hợp lệ",
      },
      { status: 400 }
    );

  try {
    const date = new Date();
    if (res.expires) {
      date.setTime(date.getTime() + res.expires * 1000);
      cookies().set({
        name: res.name,
        value: res.value,
        httpOnly: !!res.httpOnly,
        path: res.path || "/",
        expires: date,
      });
    } else
      cookies().set({
        name: res.name,
        value: res.value,
        httpOnly: !!res.httpOnly,
        path: res.path || "/",
      });
    const now = new Date();
    const updateAt = new Intl.DateTimeFormat("vi-VN").format(now);
    return NextResponse.json(
      {
        message: "set cookies sucsess",
        updateAt,
        // maxAge,
        res,
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      {
        message: "Không hợp lệ",
      },
      { status: 400 }
    );
  }
}

export async function GET(request: Request) {
  const key = new URL(request.url).searchParams?.get("key");
  if (key === secret) {
    const allCookies = cookies()
      .getAll()
      .map((item) => ({
        name: item.name,
        value: item.value,
      }));
    return NextResponse.json(
      {
        allCookies,
      },
      { status: 200 }
    );
  } else
    return NextResponse.json(
      {
        message: "Không có quyền truy cập",
      },
      { status: 500 }
    );
}
