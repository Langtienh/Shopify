"use client";

import { Badge } from "antd";
import { ReactNode } from "react";

export default function RibbonCustom({ text }: { text?: ReactNode }) {
  return (
    <div className="absolute z-10 right-0">
      <Badge.Ribbon text={text} color="red"></Badge.Ribbon>
    </div>
  );
}
