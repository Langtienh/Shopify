import { cookies } from "next/headers";
import { redirect } from "next/navigation";
export default function Page() {
  const userCookie = cookies().get("user");
  if (!userCookie) redirect("/login");
  return <p>Cart</p>;
}
