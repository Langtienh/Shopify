"use client";
import { useParams } from "next/navigation";

export default function Page() {
  const path = useParams();
  console.log(path);
  return <p>{path.categoris}</p>;
}
