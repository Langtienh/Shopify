"use client";

import { Button } from "@/components/ui/button";
import { Input, Rate } from "antd";
import { Input as MyInput } from "@/components/ui/input";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { MdClose } from "react-icons/md";
import { FaCamera } from "react-icons/fa";
import { IoIosCloseCircleOutline } from "react-icons/io";
import useAction from "@/hooks/useAction";
import { useAuth } from "@/contexts/auth.context";
import { useLoginModal } from "@/contexts/loginModal.context";
import proxyUpload from "@/services/upload/proxy";

export default function CommentModal({
  title,
  productId,
}: {
  title: string;
  productId: number;
}) {
  const { user } = useAuth();
  const { showLoginModal } = useLoginModal();
  const isLogin = !!user;
  const [show, setShow] = useState<boolean>(false);
  const [response, isPending, _createComment] = useAction(proxyUpload);
  const [rate, setRate] = useState<number>(5);
  const [content, setContent] = useState<string>("");
  const path = usePathname();

  const [files, setFiles] = useState<File[]>([]);
  const handleAddImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setFiles((prestate) => [...prestate, file]);
  };
  const handleDeleteImage = (index: number) =>
    setFiles([...files.filter((_, i) => i != index)]);
  const router = useRouter();
  const handlesubmit = async () => {
    const formData = new FormData();
    formData.append("rate", rate.toString());
    formData.append("productId", productId.toString());
    formData.append("content", content);
    files.forEach((file) => {
      formData.append("images", file); // Tất cả các file đều sẽ có key "images"
    });
    const res = await _createComment("comment", formData);
    setFiles([]);
    setShow(false);
    router.refresh();
  };
  const showModalHandle = () => {
    if (isLogin) setShow(true);
    else showLoginModal(path);
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
                <div className="pt-3 flex gap-4">
                  <div className="flex gap-4">
                    {files.map((file, index) => (
                      <div
                        key={`${file.name}-${index}`}
                        className="relative mr-5"
                      >
                        <div className="size-20">
                          <Image
                            width={80}
                            height={80}
                            alt={`${file.name}-${index}`}
                            src={URL.createObjectURL(file)}
                            className="size-20 rounded-xl object-cover"
                          />
                        </div>
                        <button
                          onClick={() => handleDeleteImage(index)}
                          className="rofull absolute -top-1 -right-4"
                        >
                          <IoIosCloseCircleOutline size={20} />
                        </button>
                      </div>
                    ))}
                    {files.length < 4 && (
                      <label
                        htmlFor="files"
                        className="p-3 flex flex-col gap-3 items-center justify-center cursor-pointer border border-dashed rounded-lg"
                      >
                        <FaCamera size={24} />
                        <b className="text-sm">Thêm hình ảnh</b>
                      </label>
                    )}
                  </div>
                  <MyInput
                    onChange={handleAddImage}
                    accept="image/*"
                    name="files"
                    id="files"
                    type="file"
                    className="hidden"
                  />
                </div>
              </div>
            </div>
            <div className="p-3">
              <Button
                onClick={handlesubmit}
                disabled={!content || isPending}
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
