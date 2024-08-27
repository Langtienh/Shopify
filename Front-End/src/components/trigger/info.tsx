"use client";

import { useAppDispatch } from "@/redux/store";
import { updateUserInfo } from "@/redux/user-info/slice";
import { getMyInfoTrigger } from "@/services/trigger/query";
import { useEffect } from "react";

export default function UserInfoTrigger() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const fetchData = async () => {
      const user = await getMyInfoTrigger();
      if (user) dispatch(updateUserInfo(user));
    };
    fetchData();
  }, [dispatch]);
  return <></>;
}
