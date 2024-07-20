import { Auth } from "@/components/header/ui/ui.auth";
import { Nav } from "@/components/header/ui/ui.navmain";
import { Cart } from "@/components/header/ui/ui.cart.icon";
import Link from "next/link";
import SearchInput from "@/components/header/search/search";
export default async function Header2() {
  return (
    <>
      <div className="bg-[#d70018]  text-white">
        <div className="max-w-[1200px] mx-auto px-[10px] h-14 flex gap-4 items-center justify-between">
          <Link href="/">
            <h2 className="hidden md:block text-white font-bold text-2xl">
              Shopify
            </h2>
            <h2 className="md:hidden block text-white font-bold text-2xl">
              Shopify
            </h2>
          </Link>
          <SearchInput />
          <Nav />
          <Cart />
          <span className="hidden md:inline-block">
            <Auth />
          </span>
        </div>
      </div>
    </>
  );
}
