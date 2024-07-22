"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/redux/store";
import { useGetLoveQuery } from "@/redux/love/services";
import { cloneLoveList } from "@/redux/love/slice";

export default function CacheListLove() {
  const { data } = useGetLoveQuery();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (data) dispatch(cloneLoveList(data));
    else dispatch(cloneLoveList([]));
  }, [data, dispatch]);
  return <></>;
}
