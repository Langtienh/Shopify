import { translateCategory } from "@/lib/utils2";
import { Dropdown, MenuProps } from "antd";
import Link from "next/link";
import { CiLaptop } from "react-icons/ci";
import { IoIosTabletPortrait } from "react-icons/io";
import { IoWatchOutline } from "react-icons/io5";
import { LuSmartphone } from "react-icons/lu";
import { MdOndemandVideo, MdOutlinePersonalVideo } from "react-icons/md";
import { TfiHeadphoneAlt } from "react-icons/tfi";

const icons = {
  smartphone: <LuSmartphone />,
  laptop: <CiLaptop />,
  tablet: <IoIosTabletPortrait />,
  tivi: <MdOndemandVideo />,
  screen: <MdOutlinePersonalVideo />,
  headphone: <TfiHeadphoneAlt />,
  watch: <IoWatchOutline />,
};
export const MenuDropdown = ({
  category,
  brands,
}: {
  category: string;
  brands: BrandResponse[];
}) => {
  let items: MenuProps["items"] = brands.map((item: BrandResponse) => ({
    key: item.id,
    label: (
      <Link href={`/products/${category}/${item.name}.html`}>{item.name}</Link>
    ),
  }));
  items = [
    ...items,
    {
      key: 0,
      label: <Link href={`/products/${category}.html`}>Xem tất cả</Link>,
    },
  ];
  type IconKey = keyof typeof icons;

  function getIconNode(key: string): JSX.Element | null {
    const iconKey = key as IconKey;
    if (icons.hasOwnProperty(iconKey)) {
      return icons[iconKey];
    }
    return null;
  }
  const iconNode = getIconNode(category.toLowerCase());

  return (
    <Dropdown menu={{ items }} placement="bottom">
      <span className="h-9 flex gap-2 items-center cursor-pointer uppercase text-[12px] lg:text-sm text-white hover:text-white">
        {iconNode}
        {!!category && translateCategory(category)}
      </span>
    </Dropdown>
  );
};
