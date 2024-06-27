const categories: { en: string; vi: string }[] = [
  {
    en: "smartphone",
    vi: "Điện thoại",
  },
  {
    en: "laptop",
    vi: "Máy tính",
  },
  {
    en: "tablet",
    vi: "Máy tính bảng",
  },
  {
    en: "tivi",
    vi: "Tivi",
  },
  {
    en: "screen",
    vi: "Màn hình",
  },
  {
    en: "headphone",
    vi: "Tai nghe",
  },
  {
    en: "watch",
    vi: "Đồng hồ",
  },
];

export const translateCategory = (en: string) => {
  const index = categories.findIndex((item: { en: string }) => en === item.en);
  if (index !== -1) return categories[index].vi;
  return en;
};
