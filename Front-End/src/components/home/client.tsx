import { Button } from "antd";

export const NavBrandButton = ({
  active,
  label,
  danger,
}: {
  active?: string;
  label: string;
  danger?: boolean;
}) => {
  return (
    <Button type={active === label ? "primary" : "default"} danger={!!danger}>
      {label}
    </Button>
  );
};
