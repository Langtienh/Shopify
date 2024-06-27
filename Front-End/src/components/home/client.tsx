import { Button } from "antd";

export const NavBrandButton = ({
  label,
  danger,
}: {
  label: string;
  danger?: boolean;
}) => {
  return <Button danger={!!danger}>{label}</Button>;
};
