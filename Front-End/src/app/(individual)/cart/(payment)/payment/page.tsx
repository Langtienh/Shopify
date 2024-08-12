import { CartCheckout } from "@/components/app/individual/payment/info";
import CheckoutInfo from "@/components/app/individual/payment/checkout.info";
import { getCart } from "@/services/cart";
import { redirect } from "next/navigation";

export default async function Page({
  searchParams,
}: {
  searchParams: { checkout?: string };
}) {
  if (!searchParams.checkout) redirect("/cart");
  const checkout = searchParams.checkout.split(",").map((item) => +item);
  const cart = await getCart();
  const cartItems = cart.cartItems.filter((item) => checkout.includes(item.id));
  const totalPrice = cartItems.reduce(
    (prePrice, currentItem) =>
      prePrice + currentItem.price * currentItem.quantity,
    0
  );
  const quantity = cartItems.reduce(
    (prePrice, currentItem) => prePrice + currentItem.quantity,
    0
  );

  return (
    <>
      <CartCheckout quantity={quantity} totalPrice={totalPrice} />
      <CheckoutInfo checkout={searchParams.checkout} totalPrice={totalPrice} />
    </>
  );
}
