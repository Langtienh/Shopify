import { get, post } from "@/actions/axios.helper";
import { NextRequest, NextResponse } from "next/server";
import checkToken from "@/app/api/v1/_lib/check-token";
import getToken from "@/app/api/v1/_lib/getToken";

export async function GET() {
  const check = await checkToken();
  const { userId, token } = getToken();
  if (check && token && userId) {
    try {
      const res = await get<CartResponse>(`/wish-lists/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return NextResponse.json(res.data, { status: 200 });
    } catch {
      return NextResponse.json({ message: "error" }, { status: 500 });
    }
  }
  return NextResponse.json(
    { message: "Token hết hạn hoặc lỗi logic" },
    { status: 401 }
  );
}

type BODY = {
  loveId: number;
};

export async function POST(req: NextRequest) {
  const data = (await req.json()) as BODY;
  const check = await checkToken();
  const { userId, token } = getToken();
  if (check && userId && token) {
    try {
      const res = await post(
        `/wish-lists`,
        { ...data, userId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return NextResponse.json(res.data, { status: 200 });
    } catch {
      return NextResponse.json({ message: "error" }, { status: 500 });
    }
  }

  return NextResponse.json(
    { message: "Token hết hạn hoặc lỗi logic" },
    { status: 401 }
  );
}
