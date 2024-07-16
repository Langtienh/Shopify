"use client";
import debounce from "lodash.debounce";
import { Input } from "antd";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import {
  EmpytyProduct,
  SearchOutput,
} from "@/components/header/search/search.output";
import { SearchProductAction } from "@/actions/product.services";

export default function SearchInput() {
  const [products, setProducts] = useState<ProductResponse[]>([]);
  const [input, setInput] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  // todo
  const debounceOnChange = useCallback(
    debounce((value: string) => {
      setSearchQuery(value);
    }, 300),
    []
  );
  useEffect(() => {
    const fetchProduct = async () => {
      const data = await SearchProductAction(searchQuery);
      setProducts(data);
    };
    if (searchQuery) fetchProduct();
  }, [searchQuery]);
  const onchange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    debounceOnChange(e.target.value);
  };
  const handleCancel = () => {
    setInput("");
    setSearchQuery("");
  };
  return (
    <>
      <div className="flex-1 relative h-full flex items-center justify-center">
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
          className="overflow-hidden absolute top-[100%] max-w-[500px] w-screen bg-white text-black rounded-md z-20"
        >
          {!!products.length ? (
            <SearchOutput handleCancel={handleCancel} products={products} />
          ) : (
            <EmpytyProduct />
          )}
        </div>
      </div>
      <div
        hidden={!input}
        onClick={handleCancel}
        className="z-10 absolute left-0 top-[100%] w-screen h-screen bg-black opacity-60"
      ></div>
    </>
  );
}
