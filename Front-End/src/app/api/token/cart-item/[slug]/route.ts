import { post, del } from "@/actions/axios.helper";
import { NextRequest, NextResponse } from "next/server";
import getToken from "../../_lib/getToken";
import checkToken from "../../_lib/check-token";

type editCartItemType = {
  type: "ADD" | "SUB";
};
export async function PUT(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const check = await checkToken();
  const { userId, token } = getToken();
  if (check && token && userId) {
    const data = (await req.json()) as editCartItemType;
    const body: {
      userId: string;
      cartItems: CartItemDTO[];
    } = {
      userId,
      cartItems: [],
    };
    const item: CartItemDTO = {
      productId: +params.slug,
      quantity: data.type === "ADD" ? 1 : -1,
    };
    body.cartItems.push(item);
    try {
      const res = await post(`/carts`, body, {
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
    console.log(`/carts/cart-item/${params.slug}`);
    try {
      await del(`/carts/cart-item/${params.slug}`, {
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
