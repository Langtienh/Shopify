import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const secret = process.env.NO_SECRET!;

export type RequestSetCookies = {
  name: string;
  value: string;
  httpOnly?: boolean;
  secure?: boolean;
  path?: string;
  expires?: number;
};

type RequestType = {
  key: string;
};
// api xét cookies
export async function POST(request: Request) {
  console.log(request.url);
  const res = (await request.json()) as RequestType;
  if (!(res.key === secret))
    return NextResponse.json(
      {
        message: "Không có quyền truy cập",
      },
      { status: 401 }
    );
  const session = await getServerSession(authOptions);
  console.log(session);
  return NextResponse.json({ status: 200 });
}
