"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { IoListOutline } from "react-icons/io5";

export default function NavCategoryMobile({
  categories,
}: {
  categories: CategoryResponse[];
}) {
  const [show, setShow] = useState<boolean>(false);
  const path = usePathname();
  useEffect(() => {
    setShow(false);
  }, [path]);
  return (
    <>
      <span
        onClick={() => setShow((pre) => !pre)}
        className="h-full flex gap-3 items-center p-3 ps-0 cursor-pointer"
      >
        <IoListOutline />
        Danh mục
      </span>
      {show && (
        <div className="flex flex-col pl-10 py-2 w-screen left-0 right-0 top-full bg-[#252525] absolute z-10">
          {categories.map((category: CategoryResponse) => (
            <Link
              href={`/products/${category.name}.html`}
              className="capitalize py-1"
              key={`category-${category.id}`}
            >
              {category.label}
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
