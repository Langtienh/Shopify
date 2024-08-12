import { auth } from "@/auth/auth";
import { CartInfo } from "@/components/app/individual/payment/info";
import UserInfo from "@/components/app/individual/payment/user.info";
import { getCart } from "@/services/cart";
import { redirect } from "next/navigation";

export default async function Page({
  searchParams,
}: {
  searchParams: { checkout?: string };
}) {
  const session = await auth();
  if (!searchParams.checkout || !session?.user) redirect("/cart");
  const checkout = searchParams.checkout.split(",").map((item) => +item);
  const cart = await getCart();
  const cartItems = cart.cartItems.filter((item) => checkout.includes(item.id));
  return (
    <div>
      <CartInfo cart={cartItems} />
      <UserInfo user={session.user} checkout={searchParams.checkout} />
    </div>
  );
}
