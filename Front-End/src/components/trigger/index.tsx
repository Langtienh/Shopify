import CartTrigger from "./cart";
import UserInfoTrigger from "./info";
import WishListTrigger from "./wishList";

export default function Trigger() {
  return (
    <>
      <UserInfoTrigger />
      <CartTrigger />
      <WishListTrigger />
    </>
  );
}
