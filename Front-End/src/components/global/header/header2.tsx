import { Auth } from "./ui/auth";
import { Nav } from "./ui/navmain";
import { Cart } from "./ui/cart.icon";
import Link from "next/link";
import SearchInput from "./search/search";
import { InvoiceIcon } from "./ui/invoice.icon";
import { FaShopify } from "react-icons/fa";
export default async function Header2() {
  return (
    <>
      <div className="bg-[#d70018]  text-white">
        <div className="max-w-[1200px] mx-auto px-[10px] h-14 flex gap-4 items-center justify-between">
          <Link href="/">
            <h2 className="hidden md:flex items-center text-white font-bold text-2xl">
              <FaShopify size={34} />
              Shopify
            </h2>
            <h2 className="md:hidden block">
              <FaShopify size={34} />
            </h2>
          </Link>
          <SearchInput />
          <Nav />
          <InvoiceIcon />
          <Cart />
          <Auth />
        </div>
      </div>
    </>
  );
}
