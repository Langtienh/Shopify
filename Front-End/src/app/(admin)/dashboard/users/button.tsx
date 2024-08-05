"use client";

import { Button } from "@/components/ui/button";
import UserForm from "./form.modal";
import { useState } from "react";

export const DelUser = ({ user }: { user: UserTypeCustom }) => {
  return (
    <Button
      className="text-blue-600 hover:text-blue-500 font-bold"
      variant="link"
    >
      Xóa
    </Button>
  );
};
export const ChangePassword = ({ user }: { user: UserTypeCustom }) => {
  return (
    <Button
      className="text-violet-600 hover:text-violet-500 font-bold"
      variant="link"
    >
      Đổi mật khẩu
    </Button>
  );
};
export const EditUser = ({ user }: { user: UserTypeCustom }) => {
  const [show, setShow] = useState<boolean>(false);
  const open = () => setShow(true);
  const close = () => setShow(false);
  return (
    <>
      <Button
        className="text-red-600 hover:text-red-500 font-bold"
        variant="link"
        onClick={open}
      >
        Sửa
      </Button>
      <UserForm show={show} close={close} user={user} />
    </>
  );
};
export const AddUser = () => {
  const [show, setShow] = useState<boolean>(false);
  const open = () => setShow(true);
  const close = () => setShow(false);

  return (
    <>
      <Button onClick={open}>Thêm</Button>
      <UserForm show={show} close={close} />
    </>
  );
};
