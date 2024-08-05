import { HiArrowPath } from "react-icons/hi2";
import clsx from "clsx";
import Image from "next/image";
import { getLatestInvoices } from "@/services/invoice";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default async function LatestInvoices() {
  const latestInvoices = await getLatestInvoices();

  return (
    <div className="flex flex-col">
      <h2 className="mb-4 text-xl md:text-2xl">Hóa đơn mới nhất</h2>
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
        <div className="bg-white px-6">
          {latestInvoices.map((invoice, i) => {
            return (
              <div
                key={invoice.id}
                className={clsx(
                  "flex flex-row items-center justify-between py-4",
                  {
                    "border-t": i !== 0,
                  }
                )}
              >
                <div className="flex items-center">
                  <Avatar className="mr-4">
                    <AvatarImage src={"/images/default/avatar.jpg"} />
                    <AvatarFallback>
                      <Image
                        src="/images/default/avatar.jpg"
                        alt={`${invoice.fullName}'s profile picture`}
                        className="rounded-full"
                        width={32}
                        height={32}
                      />
                    </AvatarFallback>
                  </Avatar>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold md:text-base">
                      {invoice.fullName}
                    </p>
                    <p className="hidden text-sm text-gray-500 sm:block">
                      {invoice.email}
                    </p>
                  </div>
                </div>
                <p className=" truncate text-sm md:text-base font-bold text-green-500">
                  +{invoice.totalPrice}
                </p>
              </div>
            );
          })}
        </div>
        <div className="flex items-center pb-2 pt-6">
          <HiArrowPath className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500 ">Cập nhật 1 giờ trước</h3>
        </div>
      </div>
    </div>
  );
}
