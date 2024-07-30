import { auth } from "@/auth/auth";
import OrderItem from "../_components/order.item";
import UserInfo from "../_components/user.info";

export default async function Page() {
  const session = await auth();
  if (session?.user)
    return (
      <div className="">
        <OrderItem />
        <UserInfo user={session.user} />
      </div>
    );
  return <></>;
}
