"use client";

import { createComment } from "@/services/comment";
import { Button } from "@/components/ui/button";
import { Input, Rate } from "antd";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { MdClose } from "react-icons/md";
import { useSession } from "next-auth/react";
import { showLoginModal } from "@/redux/login-modal/slice";
import { useAppDispatch } from "@/redux/store";

export default function CommentModal({
  title,
  productId,
}: {
  title: string;
  productId: number;
}) {
  const dispatch = useAppDispatch();
  const session = useSession().data;
  const isLogin = session?.user && session.refreshToken;
  const [show, setShow] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [rate, setRate] = useState<number>(5);
  const [content, setContent] = useState<string>("");
  const path = usePathname();
  const handlesubmit = async () => {
    const input = { rate, productId, content };
    setLoading(true);
    await createComment(input);
    setLoading(false);
    setShow(false);
  };
  const showModalHandle = () => {
    if (isLogin) setShow(true);
    else dispatch(showLoginModal(path));
  };
  return (
    <>
      <Button
        onClick={showModalHandle}
        className="py-[10px] px-[30px] bg-red-600 hover:bg-red-500"
      >
        Đánh giá ngay
      </Button>
      {show && (
        <div className="fixed z-50 top-0 left-0 w-full h-full px-[10px]">
          <div
            onClick={() => setShow(false)}
            className="absolute top-0 left-0 w-full h-full bg-black opacity-50"
          />
          <div className="absolute z-51 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-white rounded-xl overflow-hidden w-full max-w-[600px] mx-auto">
            <div className="p-3 text-lg font-bold flex items-center justify-between bg-slate-200">
              <p>Đánh giá & nhận xét</p>
              <MdClose
                size={22}
                className="cursor-pointer"
                onClick={() => setShow(false)}
              />
            </div>
            <div className="p-4">
              <div className="flex items-center gap-4">
                <Image
                  className="basis-[70px] size-[70px]"
                  width={70}
                  height={70}
                  alt="rate-hero"
                  src="/images/detail/rate-hero.webp"
                />
                <h2 className="text-lg font-bold">{title}</h2>
              </div>
              <div className="flex items-center border-b py-4">
                <h2 className="font-bold pr-5">Đánh giá chung</h2>
                <Rate
                  defaultValue={5}
                  onChange={(e) => {
                    setRate(e);
                  }}
                />
              </div>
              <div className="p-3">
                <Input.TextArea
                  onChange={(e) => setContent(e.target.value)}
                  rows={5}
                  allowClear
                  placeholder="Xin mời chia sẻ một số cảm nhận về sản phẩm (nhập tối thiểu 15 kí tự)"
                />
              </div>
            </div>
            <div className="p-3 mt-5">
              <Button
                onClick={handlesubmit}
                disabled={!content || loading}
                className="text-white text-lg font-bold bg-red-600 hover:bg-red-500 w-full px-[30px] py-[10px]"
              >
                Gửi đánh giá
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
