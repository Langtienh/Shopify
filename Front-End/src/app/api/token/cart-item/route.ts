import { del, get, post } from "@/actions/axios.helper";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import checkToken from "../_lib/check-token";
import getToken from "../_lib/getToken";

export async function GET() {
  const check = await checkToken();
  const { userId, token } = getToken();
  if (check && token && userId) {
    try {
      const res = await get<CartResponse>(`/carts/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const cartId = res.data.id;
      cookies().set({
        name: "CART_ID",
        value: `${cartId}`,
        path: "/",
      });
      return NextResponse.json(res.data.cartItems, { status: 200 });
    } catch {
      return NextResponse.json({ message: "error" }, { status: 500 });
    }
  }
  return NextResponse.json(
    { message: "Token hết hạn hoặc lỗi logic" },
    { status: 401 }
  );
}
export type BODY =
  | {
      type: "POST";
      item: CartItemDTO;
    }
  | {
      type: "DELETE";
      list: number[];
    };

export async function POST(req: NextRequest) {
  const data = (await req.json()) as BODY;
  const check = await checkToken();
  const { userId, token } = getToken();
  if (check && userId && token) {
    if (data.type === "POST") {
      const body: {
        userId: string;
        cartItems: CartItemDTO[];
      } = {
        userId,
        cartItems: [],
      };
      body.cartItems.push(data.item);
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
    // xóa nhiều
    if (data.type === "DELETE") {
      try {
        const deletePromises = data.list.map((id) => {
          return del(`/carts/cart-item/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        });

        await Promise.all(deletePromises);
        return NextResponse.json({ message: "suscess" }, { status: 200 });
      } catch (error) {
        return NextResponse.json({ message: "error" }, { status: 500 });
      }
    }
  }
  return NextResponse.json(
    { message: "Token hết hạn hoặc lỗi logic" },
    { status: 401 }
  );
}

export async function DELETE() {
  const check = await checkToken();
  const { token } = getToken();
  if (check && token) {
    const CART_ID = cookies().get("CART_ID")?.value;
    try {
      const res = await del(`/carts/${CART_ID}`, {
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
