import { getAllOrderByUserId } from "@/services/invoice";
import { Button } from "@/components/ui/button";
import { formatDate, priceThrough } from "@/lib/utils2";
import Image from "next/image";
import Link from "next/link";

export default async function ListItem() {
  const { data, firstItem } = await getAllOrderByUserId();
  return (
    <>
      <ul className="flex flex-col gap-4 pt-10">
        {firstItem.map((item, index) => (
          <li
            key={item.name}
            className="px-[10px] py-4 bg-white rounded-xl border shadow-xl flex gap-5"
          >
            <div className="flex flex-col items-center justify-center w-[110px] basis-[110px] flex-shrink-0">
              <Image
                alt={item.name}
                src={item.image}
                width={110}
                height={110}
              />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <p className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:items-center">
                <Link
                  className="text-gray-600 hover:text-red-600"
                  href={`/smember/order/${data[index].id}`}
                >
                  {item.name}
                </Link>
                <span className="text-gray-400 text-sm">
                  {formatDate(data[index].orderDate)}
                </span>
              </p>
              <div>
                <span className="py-1 px-3 rounded-xl bg-gray-300 text-gray-500 text-[13px]">
                  {data[index].orderStatus}
                </span>
              </div>
              <div className="mt-auto text-red-600 flex justify-between items-center">
                <span className="font-bold">{priceThrough(item.price)}</span>
                <Link
                  className="text-gray-600 hover:text-red-600"
                  href={`/smember/order/${data[index].id}`}
                >
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-red-600 hover:bg-white text-red-600 hover:text-red-500"
                  >
                    Xem chi tiết
                  </Button>
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
