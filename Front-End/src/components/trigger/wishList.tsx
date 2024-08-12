"use client";

import { useAppDispatch } from "@/redux/store";
import { setWishList } from "@/redux/wish-list/slice";
import { getWishListTrigger } from "@/services/trigger";
import { useEffect } from "react";

export default function WishListTrigger(): JSX.Element {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const fetchData = async () => {
      const wishListTrigger = await getWishListTrigger();
      dispatch(setWishList(wishListTrigger));
    };
    fetchData();
  }, [dispatch]);
  return <></>;
}
