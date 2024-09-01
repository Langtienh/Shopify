import BackBtn from "@/components/app/auth/btn.back";
import {
  DeleteAddressButton,
  EditAddressButton,
} from "@/components/app/individual/smember/address/button";
import RenderIf from "@/components/global/renderif";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IoIosMore } from "react-icons/io";
import { getMyAddress } from "@/services/address";
import { Button, Tag } from "antd";
import Image from "next/image";
import Link from "next/link";

export default async function Page() {
  const addresses = await getMyAddress();
  return (
    <div className="min-h-screen">
      <div className="flex gap-5 items-center">
        <BackBtn />
        <p className="text-[22px] font-bold py-2">Thông tin địa chỉ</p>
      </div>
      <ul className="mt-9 my-5 flex flex-col gap-5">
        {addresses.map((address) => (
          <li
            key={`addressId-${address.id}`}
            className="flex items-center gap-5"
          >
            <Image
              width={35}
              height={35}
              alt={address.code}
              src="/images/default/address-icon.png"
              className="size-[35px] basis-[35px]"
            />
            <div>
              <p>
                <b className="font-bold text-[17px] pr-5">{address.name}</b>
                <RenderIf renderIf={address.default}>
                  <Tag color="red">Mặc định</Tag>
                </RenderIf>
              </p>
              <p className="text-[13px] text-gray-500">{`${address.detail}, ${address.path}`}</p>
            </div>
            <div className="ml-auto">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button>
                    <IoIosMore size={20} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="left" className="w-40">
                  <DropdownMenuLabel>{address.name}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <DeleteAddressButton addressId={address.id} />
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <EditAddressButton address={address} />
                    </DropdownMenuItem>
                    <DropdownMenuItem>Close</DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </li>
        ))}
      </ul>
      <Link href="/smember/user-info/address-info/update-address">
        <Button className="w-full" danger type="primary" size="large">
          Thêm địa chỉ mới
        </Button>
      </Link>
    </div>
  );
}
