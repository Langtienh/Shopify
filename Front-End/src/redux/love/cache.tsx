"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/redux/store";
import { useGetLoveQuery } from "@/redux/love/services";
import { cloneLoveList } from "@/redux/love/slice";
import { useSession } from "next-auth/react";

export default function CacheListLove() {
  const isLogin = !!useSession().data?.user;
  if (!isLogin) return <></>;
  return <IsLogin />;
}

const IsLogin = () => {
  const { data } = useGetLoveQuery();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (data) dispatch(cloneLoveList(data));
    else dispatch(cloneLoveList([]));
  }, [data, dispatch]);
  return <></>;
};
