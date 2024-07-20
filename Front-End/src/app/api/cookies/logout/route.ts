import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const token = cookies().get("TOKEN")?.value;
  const refreshToken = cookies().get("REFRESH_TOKEN")?.value;
  cookies().delete("TOKEN");
  cookies().delete("REFRESH_TOKEN");
  if (!token) {
  } else {
  }
  return NextResponse.json({ message: "sucsess" }, { status: 200 });
}
