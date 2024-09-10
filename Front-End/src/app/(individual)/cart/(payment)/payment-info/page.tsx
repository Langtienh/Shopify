import { auth } from "@/auth/auth";
import { CartInfo } from "@/components/app/individual/payment/info";
import UserInfo from "@/components/app/individual/payment/user.info";
import { getMyAddress } from "@/services/address";
import { getCart } from "@/services/cart";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page({
  searchParams,
}: {
  searchParams: { checkout?: string };
}) {
  let user: User | undefined;
  const _user = cookies().get("USER")?.value;
  if (_user) user = JSON.parse(_user);
  if (!searchParams.checkout || !user) redirect("/cart");
  const addresses = await getMyAddress();
  const checkout = searchParams.checkout.split(",").map((item) => +item);
  const cart = await getCart();
  const cartItems = cart.cartItems.filter((item) => checkout.includes(item.id));
  return (
    <div>
      <CartInfo cart={cartItems} />
      <UserInfo
        addresses={addresses}
        user={user}
        checkout={searchParams.checkout}
      />
    </div>
  );
}
