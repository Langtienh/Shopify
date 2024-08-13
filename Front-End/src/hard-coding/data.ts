import Link from "next/link";

export const categories: {
  id: number;
  limit: number;
  slug: string;
  en: string;
  vi: string;
}[] = [
  {
    id: 1,
    limit: 24,
    slug: "dien-thoai",
    en: "smartphone",
    vi: "Điện thoại",
  },
  {
    id: 2,
    limit: 24,
    slug: "may-tinh",
    en: "laptop",
    vi: "Máy tính",
  },
  {
    id: 3,
    limit: 12,
    slug: "may-tinh-bang",
    en: "tablet",
    vi: "Máy tính bảng",
  },
  {
    id: 4,
    limit: 12,
    slug: "tivi",
    en: "tivi",
    vi: "Tivi",
  },
  {
    id: 5,
    limit: 12,
    slug: "man-hinh",
    en: "screen",
    vi: "Màn hình",
  },
  {
    id: 6,
    limit: 12,
    slug: "tai-nghe",
    en: "headphone",
    vi: "Tai nghe",
  },
  {
    id: 7,
    limit: 12,
    slug: "dong-ho",
    en: "watch",
    vi: "Đồng hồ",
  },
];

export const productImage = [
  "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung_galaxy_a15_lte_8gb_128gb_-_1.png",
  "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung_galaxy_a15_lte_8gb_128gb_-_7.png",
  "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung_galaxy_a15_lte_8gb_128gb_-_2.png",
  "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung_galaxy_a15_lte_8gb_128gb_-_6.png",
  "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung_galaxy_a15_lte_8gb_128gb_-_3.png",
  "https://cdn2.cellphones.com.vn/x/media/catalog/product/i/p/iphone-14-128gb-1.png",
  "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-14-128gb-2.png",
  "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-14-128gb-3.png",
  "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-14-128gb-6.png",
  "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/g/a/galaxy-a15-xanh-01.png",
  "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/g/a/galaxy-a15-den.png",
  "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/g/a/galaxy-a15-vang.png",
];

export const smartphoneSlider = [
  "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:120/q:90/plain/https://dashboard.cellphones.com.vn/storage/iPhone-product-banner-v1.png",
  "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:120/q:90/plain/https://dashboard.cellphones.com.vn/storage/product-b2s-2024-oppo.png",
];

// hard code
export const Describe = [
  "Mới, đầy đủ phụ kiện từ nhà sản xuất",
  "Hộp, Sách hướng dẫn, Cây lấy sim, Cáp Type C",
  "Bảo hành 12 tháng tại trung tâm bảo hành Chính hãng. 1 đổi 1 trong 30 ngày nếu có lỗi phần cứng từ nhà sản xuất. (xem chi tiết)",
  "Giá sản phẩm đã bao gồm VAT",
];

export const Shop = [
  {
    phone: "02471066524",
    address: "516 Bạch Mai, P. Trương Định, Q. Hai Bà Trưng",
    link: "https://maps.app.goo.gl/Qg3PgjvBvmTAkqtP7",
  },
  {
    phone: "02471010282",
    address: "282 Minh Khai, Q. Hai Bà Trưng, Hà Nội",
    link: "https://maps.app.goo.gl/YekUbNr6dbTJvbWh9",
  },
  {
    phone: "02471000051",
    address: "51 Đại Cồ Việt, Phường Lê Đại Hành, Quận Hai Bà Trưng",
    link: "https://maps.app.goo.gl/Zgc6z6X5yBuAYszn7",
  },
  {
    phone: "02471010128",
    address: "124 - 126 - 128 Lạc Long Quân, P. Bưởi, Q. Tây Hồ",
    link: "https://maps.app.goo.gl/bFZWUpffgxeN3xNu9",
  },
  {
    phone: "02471010384",
    address: "384 Xã Đàn, Nam Đồng, Quận Đống Đa",
    link: "https://maps.app.goo.gl/Luc4HuvkFcmw6SL2A",
  },
  {
    phone: "02471066119",
    address: "21 Thái Hà, P. Trung Liệt, Q. Đống Đa",
    link: "https://maps.app.goo.gl/aTa8rgQaZDFGKH3T6",
  },
  {
    phone: "02471066524",
    address: "516 Bạch Mai, P. Trương Định, Q. Hai Bà Trưng",
    link: "https://maps.app.goo.gl/Qg3PgjvBvmTAkqtP7",
  },
  {
    phone: "02471010282",
    address: "282 Minh Khai, Q. Hai Bà Trưng, Hà Nội",
    link: "https://maps.app.goo.gl/YekUbNr6dbTJvbWh9",
  },
  {
    phone: "02471000051",
    address: "51 Đại Cồ Việt, Phường Lê Đại Hành, Quận Hai Bà Trưng",
    link: "https://maps.app.goo.gl/Zgc6z6X5yBuAYszn7",
  },
  {
    phone: "02471010128",
    address: "124 - 126 - 128 Lạc Long Quân, P. Bưởi, Q. Tây Hồ",
    link: "https://maps.app.goo.gl/bFZWUpffgxeN3xNu9",
  },
  {
    phone: "02471010384",
    address: "384 Xã Đàn, Nam Đồng, Quận Đống Đa",
    link: "https://maps.app.goo.gl/Luc4HuvkFcmw6SL2A",
  },
  {
    phone: "02471066119",
    address: "21 Thái Hà, P. Trung Liệt, Q. Đống Đa",
    link: "https://maps.app.goo.gl/aTa8rgQaZDFGKH3T6",
  },
  {
    phone: "02471066524",
    address: "516 Bạch Mai, P. Trương Định, Q. Hai Bà Trưng",
    link: "https://maps.app.goo.gl/Qg3PgjvBvmTAkqtP7",
  },
  {
    phone: "02471010282",
    address: "282 Minh Khai, Q. Hai Bà Trưng, Hà Nội",
    link: "https://maps.app.goo.gl/YekUbNr6dbTJvbWh9",
  },
  {
    phone: "02471000051",
    address: "51 Đại Cồ Việt, Phường Lê Đại Hành, Quận Hai Bà Trưng",
    link: "https://maps.app.goo.gl/Zgc6z6X5yBuAYszn7",
  },
  {
    phone: "02471010128",
    address: "124 - 126 - 128 Lạc Long Quân, P. Bưởi, Q. Tây Hồ",
    link: "https://maps.app.goo.gl/bFZWUpffgxeN3xNu9",
  },
  {
    phone: "02471010384",
    address: "384 Xã Đàn, Nam Đồng, Quận Đống Đa",
    link: "https://maps.app.goo.gl/Luc4HuvkFcmw6SL2A",
  },
  {
    phone: "02471066119",
    address: "21 Thái Hà, P. Trung Liệt, Q. Đống Đa",
    link: "https://maps.app.goo.gl/aTa8rgQaZDFGKH3T6",
  },
];

export const MoreOffer = [
  "Xem chính sách ưu đãi dành cho thành viên Smember",
  "Giảm đến 600K khi mở thẻ tín dụng VIB",
  "Giảm 500K khi thanh toán qua thẻ OCB",
  "Giảm đến 700.000đ khi thanh toán qua Kredivo",
  "Giảm 400.000đ khi thanh toán bằng thẻ tín dụng Home Credit",
  "Nhập mã CPSBTS Giảm 2% tối đa 300K qua MOMO",
  "Liên hệ B2B để được tư vấn giá tốt nhất cho khách hàng doanh nghiệp khi mua số lượng nhiều",
  "Xem chính sách ưu đãi dành cho thành viên Smember",
  "Giảm đến 600K khi mở thẻ tín dụng VIB",
  "Giảm 500K khi thanh toán qua thẻ OCB",
  "Giảm đến 700.000đ khi thanh toán qua Kredivo",
];
export const NavSmemverData = [
  {
    icon: "/images/smember/s-home.svg",
    label: "Trang chủ",
    link: "/",
  },

  {
    icon: "/images/smember/order.svg",
    label: "Lịch sử mua hàng",
    link: "/order",
    isNew: true,
  },

  {
    icon: "/images/smember/warranty.svg",
    label: "Tra cứu bảo hành",
    link: "/warranty",
    isNew: true,
  },

  {
    icon: "/images/smember/promotion.svg",
    label: "Ưu đãi của bạn",
    link: "/promotion",
    isNew: true,
  },

  {
    icon: "/images/smember/rank.svg",
    label: "Hạng thành viên",
    link: "/rank",
    isNew: true,
  },

  {
    icon: "/images/smember/user-info.svg",
    label: "Đổi mật khẩu",
    link: "/change-password",
    isNew: true,
  },

  {
    icon: "/images/smember/social-account.svg",
    label: "Liên kết tài khoản",
    link: "/social-account",
    isNew: true,
  },

  {
    icon: "/images/smember/support.svg",
    label: "Hỗ trợ",
    link: "/support",
  },

  {
    icon: "/images/smember/feedback.svg",
    label: "Góp ý - Phản hồi",
    link: "/feedback",
  },
];
