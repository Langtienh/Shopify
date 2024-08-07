import Link from "next/link";
import NavLinks, { LogoutBtn } from "./nav.link";
export default function Sider() {
  return (
    <div className="flex lg:basis-[220px] flex-col px-3 py-4 lg:px-2 h-screen">
      <Link className="mb-2 rounded-md bg-blue-600 p-4" href="/">
        <p className=" text-white font-bold text-2xl">Shopify</p>
      </Link>
      <div className="mt-auto flex grow justify-between flex-col space-x-0 space-y-2">
        <NavLinks />
        <div className="h-auto w-full grow rounded-md bg-gray-50 block"></div>
        <LogoutBtn />
      </div>
    </div>
  );
}
