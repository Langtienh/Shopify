"use client";

import { hiddenLoginModal } from "@/redux/login/slice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import Image from "next/image";
import Link from "next/link";

export default function LoginModal() {
  // global show
  const isShow = useAppSelector((state) => state.login.show);
  const calbackUrl = useAppSelector((state) => state.login.calbackUrl);
  const path = !calbackUrl ? `/login` : `/login?callbackUrl=${calbackUrl}`;
  const dispatch = useAppDispatch();
  const setHidden = () => dispatch(hiddenLoginModal());
  if (isShow)
    return (
      <div className="fixed top-0 left-0 right-0 bottom-0 z-50">
        <div
          onClick={setHidden}
          className="absolute z-50 top-0 left-0 right-0 bottom-0 bg-black opacity-50"
        ></div>
        <div className="relative z-[51] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] flex flex-col items-center justify-center p-[15px] bg-white rounded-2xl">
          <h2 className="text-red-600 font-bold text-[25px]">Smember</h2>
          <Image
            width={80}
            height={80}
            src="/images/Shipper.png"
            alt="Shipper"
          />
          <p className="font-bold mt-3 w-full text-center">
            Vui lòng đăng nhập tài khoản Smember để xem ưu đãi và thanh toán dễ
            dàng hơn.
          </p>
          <div className="mt-3 w-full grid grid-cols-2 gap-4">
            <Link
              onClick={setHidden}
              href="/register"
              className="text-center hover:scale-[1.02] font-bold relative inline-flex items-center justify-center p-0.5  me-2 overflow-hidden text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400  dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800"
            >
              <span className="text-red-600 font-bold relative w-full py-2.5 transition-all ease-in duration-75 bg-white text-base dark:bg-gray-900 rounded-md">
                Đăng kí
              </span>
            </Link>
            <Link
              onClick={setHidden}
              href={path}
              type="button"
              className="hover:scale-[1.02] text-white font-bold bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800  rounded-lg  py-2.5 text-center me-2 "
            >
              Đăng nhập ngay
            </Link>
          </div>
        </div>
      </div>
    );
  return <div></div>;
}
