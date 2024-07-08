import { Auth, Cart, Nav } from "@/components/header/ui";
import Link from "next/link";
import SearchInput from "@/components/header/search";
export default async function Header2() {
  return (
    <>
      <div className="bg-[#d70018]  text-white">
        <div className="max-w-[1200px] mx-auto px-1 h-14 flex items-center justify-between">
          <Link href="/">
            <h2 className="hidden md:block text-white font-bold text-2xl">
              Smart Shop
            </h2>
            <h2 className="md:hidden block text-white font-bold text-2xl">
              S-Shop
            </h2>
          </Link>
          <SearchInput />
          <Nav />
          <Cart />
          <Auth />
        </div>
      </div>
    </>
  );
}
