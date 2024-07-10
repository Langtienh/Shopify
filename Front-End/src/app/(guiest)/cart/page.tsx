import { config } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect, RedirectType } from "next/navigation";
export default async function Page() {
  const session = await getServerSession(config);
  if (!session?.user) redirect("/login", RedirectType.replace);
  return <p>Cart</p>;
}
