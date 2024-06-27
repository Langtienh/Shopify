import Image from "next/image";
import { Auth, Cart, Nav, SearchInput } from "@/components/header/ui";
import Link from "next/link";

export default function Header1() {
  return (
    <>
      <div className="bg-[#e9efff]">
        <div className="py-[5px] max-w-[1200px] mx-auto px-1 flex justify-between ">
          <Image
            width={300}
            height={30}
            alt="top banner"
            src={"/topBanner/top banner (1).svg"}
          />
          <Image
            width={300}
            height={30}
            alt="top banner"
            src={"/topBanner/top banner (3).svg"}
          />
          <Image
            width={300}
            height={30}
            alt="top banner"
            src={"/topBanner/top banner (2).svg"}
          />
        </div>
      </div>
      <div className="bg-[#d70018]">
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
