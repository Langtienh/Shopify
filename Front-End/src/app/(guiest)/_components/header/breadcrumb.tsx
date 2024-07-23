"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiFillHome } from "react-icons/ai";
import { MdNavigateNext } from "react-icons/md";

export default function Breadcrumb() {
  let path = usePathname();
  if (path === "/") return <></>;
  path = path.replace("product/", "products/");
  const paths = path.split("/");
  const breadcrumb = paths
    .map((item) => item.replace(".html", ""))
    .filter((item) => !!item);
  const addPath = (index: number) => {
    let path = "";
    for (let i = 0; i <= index; i++) path = path + "/" + breadcrumb[i];
    if (breadcrumb[0].includes("product"))
      if (index === 0) {
        return path;
      } else return path + ".html";
    return path;
  };
  return (
    <div className=" bg-white shadow-md">
      <div className="h-[30px] w-full max-w-[1200px] mx-auto px-[10px] flex items-center text-[12px] text-[#707070] overflow-auto no-scrollbar text-nowrap">
        <Link href="/" className="flex items-center gap-2 me-3">
          <AiFillHome className="text-red-500" size={14} />
          <span>Trang chủ</span>
        </Link>
        {!!breadcrumb.length &&
          breadcrumb.map((item, index) => (
            <Link
              className="flex items-center gap-2 me-3 capitalize"
              key={`breadcrumd-${index}'`}
              href={addPath(index)}
            >
              <MdNavigateNext size={14} />
              <span>{item}</span>
            </Link>
          ))}
      </div>
    </div>
  );
}
