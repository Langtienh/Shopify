"use client";
import { TableCell, TableRow } from "@/components/ui/table";
import { converPriceToVN } from "@/lib/ultils";
import { useState } from "react";
import { DelProduct, EditProduct, ViewDetailToggle } from "./button";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import RenderIf from "@/components/renderif";
import { Badge } from "antd";

export default function Record({ product }: { product: Product }) {
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const toggle = (value: boolean) => setShowDetail(!value);
  // obj to arr
  const keyValueArray = Object.entries(product.attributes).map(
    ([key, value]) => ({ key, value })
  );
  return (
    <>
      <TableRow className="hover:bg-gray-50">
        <TableCell>
          <ViewDetailToggle isShow={showDetail} toggle={toggle} />
        </TableCell>
        <TableCell className="font-bold">{`P0${product.id}`}</TableCell>
        <TableCell>
          <div className="font-bold capitalize max-w-[350px] line-clamp-1 text-nowrap">
            {product.name}
          </div>
        </TableCell>
        <TableCell className="text-center">
          <RenderIf renderIf={product.stock === 0}>
            <Badge
              status="error"
              text={<span className="text-red-500 font-bold">Hết hàng</span>}
            />
          </RenderIf>
          <RenderIf renderIf={!!product.stock && product.active}>
            <Badge status="success" text="Đang bán" />
          </RenderIf>
          <RenderIf renderIf={!!product.stock && !product.active}>
            <Badge status="default" text="Dừng bán" />
          </RenderIf>
        </TableCell>
        <TableCell className="text-center">
          {converPriceToVN(product.price, "đ")}
        </TableCell>
        <TableCell className="text-center">{product.stock}</TableCell>
        <TableCell className="text-center">{product.viewCount}</TableCell>
        <TableCell className="text-center">
          <div className="flex gap-3 w-full justify-center">
            <span> {product.avgRate.toFixed(1)}</span>
            <FaStar className="text-yellow-500" size={18} />
          </div>
        </TableCell>
        <TableCell className="flex gap-3 justify-center items-center">
          <EditProduct product={product} />
          <DelProduct productId={product.id} />
        </TableCell>
      </TableRow>
      {showDetail && (
        <TableRow>
          <TableCell className="bg-gray-50" colSpan={8}>
            <div className="flex gap-5 w-full">
              <Image
                className="basis-[80px]"
                src={product.image}
                alt={product.name}
                width={80}
                height={80}
              />
              <ul className="flex-1 grid gap-2">
                <li>Mô tả: {product.description}</li>
                <div className="flex *:flex-1 w-full">
                  <li>Thương hiệu: {product.brand}</li>
                  <li>Giảm giá: {product.discount}%</li>
                  <li>
                    Giảm thêm cho member:{" "}
                    {converPriceToVN(product.discountForMember, "đ")}
                  </li>
                </div>
                <li className="flex *:flex-1 w-full">
                  {keyValueArray.map((item) => (
                    <span key={item.key}>{`${item.key}: ${item.value}`}</span>
                  ))}
                </li>
              </ul>
            </div>
          </TableCell>
        </TableRow>
      )}
    </>
  );
}
