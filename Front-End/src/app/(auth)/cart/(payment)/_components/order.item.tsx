import { useAppSelector } from "@/redux/store";

export default function OrderItem() {
  const cart = useAppSelector((state) => state.cart.cart);
  const checked = useAppSelector((state) => state.cart.checked);
  return <div></div>;
}
