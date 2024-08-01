"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { MdNavigateNext } from "react-icons/md";

type PropsType = {
  hiddenNoiti: () => void;
  show: boolean;
};

export default function Noiti({ hiddenNoiti, show }: PropsType) {
  const isAdmin = useSession().data?.user?.roles?.includes("admin");
  if (show) {
    return (
      <div className="fixed z-50 top-14 w-full left-1/2 -translate-x-1/2 bottom-0">
        <div
          onClick={hiddenNoiti}
          className="absolute w-full left-1/2 -translate-x-1/2 h-full bg-black opacity-50 cursor-pointer"
        ></div>
        <div className="absolute w-full max-w-[1200px] left-1/2 -translate-x-1/2">
          <div className="absolute h-[440px] right-[10px] top-[10px] w-[350px] bg-white rounded-2xl flex flex-col">
            <div className="absolute top-0 right-6 -translate-y-full w-0 h-0 border-l-8 border-r-8 border-b-[16px] border-l-transparent border-r-transparent border-b-white"></div>
            <div className="p-[10px]">{isAdmin ? <IsAdmin /> : <IsUser />}</div>
            <p className="p-[10px] font-bold text-black">Thông báo</p>

            <div className="h-[1px] w-full bg-gray-300" />
            <div className="flex flex-1 flex-col items-center justify-center gap-3">
              <Image
                width={90}
                height={90}
                src="/images/header/empty.noiti.svg"
                alt="hello"
              />
              <div className="text-center">
                <div className="font-bold text-gray-600">
                  Ở đây hơi trống trải.
                </div>
                <p className="text-sm w-3/4 mx-auto">
                  S-Ant sẽ gửi cho bạn những thông báo mới nhất tại đây nhé!
                </p>
              </div>
            </div>
            <div className="h-[1px] w-full bg-gray-300 mt-auto" />
            <p
              onClick={hiddenNoiti}
              className="p-[10px] text-center font-bold text-blue-500 cursor-pointer"
            >
              Đóng
            </p>
          </div>
        </div>
      </div>
    );
  }
  return <></>;
}

const IsUser = () => (
  <Link
    href="/smember"
    className="w-full h-[50px] border border-red-600 rounded-lg px-2 flex items-center"
  >
    <Image
      width={35}
      height={35}
      src="/images/header/hello.noiti.svg"
      alt="hello"
    />
    <p className="text-red-600 font-bold ms-5">Truy cập Smember</p>
    <MdNavigateNext size={24} className="text-red-600 font-bold ms-auto" />
  </Link>
);
const IsAdmin = () => (
  <>
    <Link
      href="/dashboard"
      className="w-full h-[50px] border border-red-600 rounded-lg px-2 flex items-center"
    >
      <Image
        width={35}
        height={35}
        src="/images/header/hello.noiti.svg"
        alt="hello"
      />
      <p className="text-red-600 font-bold ms-5">Truy cập dashboard</p>
      <MdNavigateNext size={24} className="text-red-600 font-bold ms-auto" />
    </Link>
    <p className="text-black text-center mt-2 -mb-5">
      Hoặc{" "}
      <Link
        href="/smember"
        className="text-blue-600 hover:text-blue-500 font-bold"
      >
        trang người dùng
      </Link>
    </p>
  </>
);
