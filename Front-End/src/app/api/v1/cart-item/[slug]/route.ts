import { del, put } from "@/actions/axios.helper";
import { NextRequest, NextResponse } from "next/server";
import getToken from "@/app/api/v1/_lib/getToken";
import checkToken from "@/app/api/v1/_lib/check-token";

export async function PUT(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const check = await checkToken();
  const { userId, token } = getToken();
  if (check && token && userId) {
    const data = await req.json();
    try {
      const res = await put(`/carts2/cart-item/${params.slug}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return NextResponse.json(res, { status: 200 });
    } catch {
      return NextResponse.json({ message: "error" }, { status: 500 });
    }
  }
  return NextResponse.json(
    { message: "Token hết hạn hoặc lỗi logic" },
    { status: 401 }
  );
}

export async function DELETE(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const check = await checkToken();
  const { userId, token } = getToken();
  if (check && token && userId) {
    try {
      await del(`/carts2/cart-item/${params.slug}`, {
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
