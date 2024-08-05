"use client";
import debounce from "lodash.debounce";
import { Input } from "antd";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
import {
  EmpytyProduct,
  SearchOutput,
} from "@/components/header/search/search.output";
import { searchProductByName } from "@/services/product";
import { usePathname } from "next/navigation";

export default function SearchInput() {
  const [products, setProducts] = useState<ProductResponse[]>([]);
  const [input, setInput] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const debounceRef = useRef(
    debounce((value: string) => {
      setSearchQuery(value);
    }, 200)
  );
  useEffect(() => {
    const fetchProduct = async () => {
      const data = await searchProductByName(searchQuery);
      setProducts(data);
    };
    if (searchQuery) fetchProduct();
  }, [searchQuery]);
  const onchange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    debounceRef.current(e.target.value);
  };
  const handleCancel = () => {
    setInput("");
    setSearchQuery("");
  };
  const path = usePathname();
  useEffect(() => {
    setInput("");
  }, [path]);
  return (
    <>
      <div className="flex-1 h-full flex items-center justify-center">
        <div className="max-w-[500px] w-full text-gray-500">
          <Input
            allowClear
            value={input}
            onChange={onchange}
            className="w-full px-4"
            prefix={<FaSearch />}
            placeholder="Bạn cần tìm gì"
          />
        </div>
        <div
          hidden={!input}
          className=" fixed z-50 top-14 left-0 right-0 bottom-0 "
        >
          <div
            onClick={handleCancel}
            className="absolute left-1/2 -translate-x-1/2 top-0 w-full h-full bg-black opacity-50"
          ></div>
          <div className="absolute left-0 right-0 top-1">
            <div className="max-w-[1200px] mx-auto px-[10px] flex sm:gap-4 justify-between">
              <div className="sm:w-8 md:w-[122px]"></div>
              <div className="sm:max-w-[500px] w-full bg-white text-black rounded-md overflow-hidden">
                {!!products.length ? (
                  <SearchOutput
                    handleCancel={handleCancel}
                    products={products}
                  />
                ) : (
                  <EmpytyProduct />
                )}
              </div>
              <div className="sm:w-28 md:w-[250px] lg:w-[500px]"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
