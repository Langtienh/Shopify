"use client";

import Image from "next/image";
import Link from "next/link";
import RenderIf from "@/components/global/renderif";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useEffect } from "react";
import { hiddenLoginModal } from "@/redux/login-modal/slice";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

export default function LoginModal() {
  const session = useSession().data;
  const isFirstLoginByProvider = session?.user && !session.refreshToken;
  const path = usePathname();
  const dispatch = useAppDispatch();
  const calbackUrl = useAppSelector((state) => state.loginModal.calbackUrl);
  const isShow = useAppSelector((state) => state.loginModal.show);
  const _calbackUrl = !calbackUrl
    ? `/login`
    : `/login?callbackUrl=${calbackUrl}`;

  useEffect(() => {
    dispatch(hiddenLoginModal());
  }, [path, dispatch]);
  const handleLogout = async () => {
    await signOut({ callbackUrl: "/login" });
  };
  return (
    <RenderIf renderIf={isShow}>
      <RenderIf renderIf={!isFirstLoginByProvider}>
        <div className="fixed top-0 left-0 right-0 bottom-0 z-50">
          <div
            onClick={() => dispatch(hiddenLoginModal())}
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
              Vui lòng đăng nhập tài khoản Smember để xem ưu đãi và thanh toán
              dễ dàng hơn.
            </p>
            <div className="mt-3 w-full grid grid-cols-2 gap-4">
              <Link
                href="/register"
                className="text-center hover:scale-[1.02] font-bold relative inline-flex items-center justify-center p-0.5  me-2 overflow-hidden text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400  dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800"
              >
                <span className="text-red-600 font-bold relative w-full py-2.5 transition-all ease-in duration-75 bg-white text-base rounded-md">
                  Đăng kí
                </span>
              </Link>
              <Link
                href={_calbackUrl.replace("/login", "/first-login")}
                type="button"
                className="hover:scale-[1.02] text-white font-bold bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800  rounded-lg  py-2.5 text-center me-2 "
              >
                Đăng nhập ngay
              </Link>
            </div>
          </div>
        </div>
      </RenderIf>
      <RenderIf renderIf={isFirstLoginByProvider}>
        <div className="fixed top-0 left-0 right-0 bottom-0 z-50">
          <div
            onClick={() => dispatch(hiddenLoginModal())}
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
              Vui lòng cập nhật số điện thoại để tiếp tục
            </p>
            <div className="mt-3 w-full grid grid-cols-2 gap-4">
              <button
                onClick={handleLogout}
                className="text-center hover:scale-[1.02] font-bold relative inline-flex items-center justify-center p-0.5  me-2 overflow-hidden text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400  dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800"
              >
                <span className="text-red-600 font-bold relative w-full py-2.5 transition-all ease-in duration-75 bg-white text-base rounded-md">
                  Đăng suất
                </span>
              </button>
              <Link
                href={_calbackUrl.replace("/login", "/first-login")}
                type="button"
                className="hover:scale-[1.02] text-white font-bold bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800  rounded-lg  py-2.5 text-center me-2 "
              >
                Cập nhật
              </Link>
            </div>
          </div>
        </div>
      </RenderIf>
    </RenderIf>
  );
}
