import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import checkToken from "../_lib/check-token";
import { get, post } from "@/services/axios.helper";

export async function GET() {
  await checkToken();
  const token = cookies().get("TOKEN")?.value;
  cookies().delete("TOKEN");
  cookies().delete("REFRESH_TOKEN");
  try {
    const res = await post(`/users/logout`, {
      token,
    });
    return NextResponse.json(res, { status: 200 });
  } catch {
    return NextResponse.json({ message: "error" }, { status: 200 });
  }
}
