import { del, get, post } from "@/actions/axios.helper";
import { NextRequest, NextResponse } from "next/server";
import checkToken from "@/app/api/v1/_lib/check-token";
import getToken from "@/app/api/v1/_lib/getToken";

export async function POST(req: NextRequest) {
  const data = await req.json();
  const check = await checkToken();
  const { userId, token } = getToken();
  if (check && userId && token) {
    try {
      await checkToken();
      const { userId, token } = getToken();
      const res = await post(
        "/orders",
        { ...data, userId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return NextResponse.json(res, { status: 200 });
    } catch {
      return NextResponse.json({ message: "error" }, { status: 500 });
    }
  }
}
