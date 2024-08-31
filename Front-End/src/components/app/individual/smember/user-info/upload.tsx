"use client";
import RenderIf from "@/components/global/renderif";
import { Input } from "@/components/ui/input";
import useAction from "@/hooks/useAction";
import { useAppDispatch } from "@/redux/store";
import { updateAvatar } from "@/redux/user-info/slice";
import { uploadAvatar } from "@/services/upload";
import { Button } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { FaCamera } from "react-icons/fa";

export default function UploadAvatar({ avatar }: { avatar?: string }) {
  const [url, setUrl] = useState<string | null>(null);
  const [files, setFiles] = useState<File | null>(null);

  const [response, isPending, _uploadAvatar] = useAction(uploadAvatar);

  useEffect(() => {
    if (avatar) setUrl(avatar);
    else setUrl("/images/default/avatar.jpg");
  }, [avatar]);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("files", files as File);
    const res = await _uploadAvatar(formData);
    if (res) {
      if (url) dispatch(updateAvatar(url));
    }
    setFiles(null);
    router.refresh();
  };

  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFiles(file);
      setUrl(URL.createObjectURL(file));
    }
  };

  return (
    <>
      <span className="relative">
        {url && (
          <Image
            width={80}
            height={80}
            alt="avatar"
            src={url}
            className="size-20 rounded-full"
          />
        )}

        <div className="absolute bottom-0 right-0">
          <Button
            icon={
              <label htmlFor="upload12">
                <FaCamera />
              </label>
            }
            shape="circle"
          />
        </div>
      </span>
      <Input
        id="upload12"
        name="upload12"
        className="hidden"
        onChange={handleChangeImage}
        type="file"
        accept="image/*"
      />
      <RenderIf renderIf={files}>
        <Button loading={isPending} onClick={handleUpload}>
          {isPending ? "Đang cập nhật" : "Cập nhật"}
        </Button>
      </RenderIf>
    </>
  );
}
