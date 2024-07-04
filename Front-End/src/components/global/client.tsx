"use client";
import { Button } from "antd";
import { usePathname } from "next/navigation";

export const NavBrandButton = ({
  label,
  danger,
}: {
  label: string;
  danger?: boolean;
}) => {
  const patchName = usePathname();
  let parts = patchName.split("/");
  const brand = parts[parts.length - 1];
  return (
    <Button
      ghost={brand === label}
      type={brand === label ? "primary" : "default"}
      danger={danger}
    >
      {label}
    </Button>
  );
};
