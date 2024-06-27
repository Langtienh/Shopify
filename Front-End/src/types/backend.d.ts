// // product
type TDate = {
  createAt: string;
  updateAt: string;
};

type TCategory = {
  id: string;
  category: string;
};

type TBrand = {
  id: string;
  brand: string;
  categoryId: string;
};

type TCategoriesValue =
  | "smartphone"
  | "laptop"
  | "tablet"
  | "watch"
  | "headphone"
  | "screen"
  | "tivi";

type TSmartphoneBrandValue =
  | "iphone"
  | "samsung"
  | "oppo"
  | "xiaomi"
  | "realme";
type TLaptopBrandValue = "asus" | "lg" | "samsung" | "msi" | "sonic";
type TTabletBrandValue = "apple" | "samsung";
type TWatchBrandValue = "apple" | "samsung" | "xiaomi" | "huawei" | "coros";
type THeadphoneBrandValue = "apple" | "sony" | "jbl" | "marsall";
type TScreenBrandValue = "apple" | "samsung" | "xiaomi" | "huawei" | "coros";

type TProduct = {
  id: string;
  category: string;
  brand: string;
  name: string;
  image: string;
  description: string;
  // priceThrought : giá gốc = priceShow * discount / 100
  priceThrought: number;
  priceShow: number; // giá bán
  discount: number; // giảm giá - đơn vị %
  discountForMember: number; // giá mà thành viên được giảm
  rate: number;
  stock: number;
  viewCount: number;
  active: boolean;
};

type TWatch = {
  productId: string;
  brand: string;
  features: string;
  healthuUtility: string;
  frameMaterial: string;
};

type THeadphone = {
  productId: string;
  frameMaterial: string;
  healthUtility: string;
  features: string;
};

type TSmartphone = {
  productId: string;
  brand: string;
  ram: number;
  rom: number;
  screenSize: number;
};

type TTablet = {
  productId: string;
  brand: string;
  ram: number;
  rom: number;
};

type TLaptop = {
  productId: string;
  brand: string;
  ram: number;
  rom: number;
  screenSize: number;
  cpu: string;
};

// tỉnh huyện xã

type TTinh = {
  id: string;
  name: string;
  nameWithType: string;
  code: string;
};

type THuyen = {
  id: string;
  name: string;
  nameWithType: string;
  pathWithType: string;
  code: string;
  parentCode: string;
};

type TXa = {
  id: string;
  name: string;
  pathWithType: string;
  parentCode: string;
};

// // api
// các biến t đặt trong dấu {} nha ví dụ ?category={category} có ngĩa là ?category=laptop

// baseURL/categories
type APICategories = TCategories[];

// baseURL/brands?category={category}
type APIBrands = TBrands[];

// baseURL/topProducts?category={category}
type APITopProducts = TProduct[];

// baseURL/products?category={category}
// baseURL/products?category={category}&sort={attribulte}&oder={sortType}
// baseURL/products?category={category}&brand={brand}
// baseURL/products?category={category}&brand={brand}&sort={attribulte}&oder={sortType}
// filter????
// baseURL/products?search=name
type APIProducts = TProduct[];

// baseURL/tinh
type APITinh = TTinh[];

// baseURL/huyen?parentCode={parentCode}
type APIHuyen = THuyen[];

// baseURL/xa?parentCode={parentCode}
type APIXa = TXa[];
