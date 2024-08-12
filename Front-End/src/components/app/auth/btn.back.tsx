"use client";

import { Button } from "antd";
import { useRouter } from "next/navigation";
import { MdArrowBack } from "react-icons/md";

export default function BackBtn() {
  const routes = useRouter();
  return (
    <Button
      onClick={() => routes.back()}
      type="text"
      icon={<MdArrowBack size={30} className="text-gray-400" />}
    />
  );
}
