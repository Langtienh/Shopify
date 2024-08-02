"use client";

import { Button } from "@/components/ui/button";
import UserForm from "./form.modal";
import { useState } from "react";

export const DelUser = ({ user }: { user: UserTypeCustom }) => {
  return (
    <Button className="bg-red-600 hover:bg-red-500" size="sm">
      Xóa
    </Button>
  );
};
export const EditUser = ({ user }: { user: UserTypeCustom }) => {
  const [show, setShow] = useState<boolean>(false);
  const open = () => setShow(true);
  const close = () => setShow(false);
  return (
    <>
      <Button onClick={open} size="sm">
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
