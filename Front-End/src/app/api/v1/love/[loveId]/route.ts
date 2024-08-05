import { del } from "@/services/axios.helper";
import { NextRequest, NextResponse } from "next/server";
import getToken from "@/app/api/v1/_lib/getToken";
import checkToken from "@/app/api/v1/_lib/check-token";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { loveId: string } }
) {
  const check = await checkToken();
  const { token } = getToken();
  if (check && token) {
    try {
      await del(`/wish-lists/${params.loveId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return NextResponse.json({ message: "suscess" }, { status: 200 });
    } catch {
      return NextResponse.json({ message: "error" }, { status: 500 });
    }
  }
  return NextResponse.json(
    { message: "Token hết hạn hoặc lỗi logic" },
    { status: 401 }
  );
}
