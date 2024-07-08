import { redirect, RedirectType } from "next/navigation";
export default async function Page() {
  // const session = await getServerSession(authOptions);
  // if (!session?.user) redirect("/login", RedirectType.replace);
  return <p>Cart</p>;
}
