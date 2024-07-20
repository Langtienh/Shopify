import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  cookies().delete("TOKEN");
  cookies().delete("REFRESH_TOKEN");
  return NextResponse.json({ message: "sucsess" }, { status: 200 });
}
