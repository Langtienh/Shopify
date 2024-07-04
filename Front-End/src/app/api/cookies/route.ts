import { cookies } from "next/headers";
export async function GET(request: Request) {
  // get cookies
  // get req
  const cookiesAll: any = {};
  cookies()
    .getAll()
    .forEach((cookie) => {
      cookiesAll[cookie.name] = cookie.value;
    });
  return Response.json({ message: "hello world", cookiesAll });
}
