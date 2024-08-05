type Product = {
  id: number;
  name: string;
  price: number;
  discount: number;
  stock: number;
  viewCount: number;
  description: string;
  image: string;
  discountForMember: number;
  active: boolean;
  brand: string;
  category: string;
  avgRat: number;
  attributes: {};
};

type CartItemType = {
  id: number;
  productId: number;
  name: string;
  image: string;
  price: number;
  discount: number;
  discountForMember: number;
  quantity: number;
};
type CartType = {
  id: number;
  userId: number;
  total: number;
  totalProduct: number;
  totalQuantity: number;
  cartItems: CartItemType[];
};

type Love = {
  id: number;
  userId: number;
  productId: number;
  name: string;
  image: string;
  price: number;
  discount: number;
  discountForMember: number;
};

type CommentType = {
  id: number;
  content: string;
  rate: number;
  user: UserType;
  product: Product;
  productId: number;
};

type OrderDetailType = {
  id: number;
  orderId: number;
  productId: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
  discount: number;
};

type OrderType = {
  id: number;
  fullName: string;
  phone: string;
  email: string;
  address: string;
  orderDate: string;
  totalPrice: number;
  orderStatus: OrderStatus;
  active: boolean;
  paymentMethod: string;
  userId: number;
};

type OrderStatus =
  | "PENDING"
  | "PROCESSING"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED";

type CategoryType = {
  id: number;
  name: string;
};

type BrandType = {
  id: number;
  name: string;
};
type CategoryBrandType = {
  id: number;
  brand: string;
  category: string;
};
type UserTypeCustom = Omit<UserType, "id"> & { id: string };

type UserType = {
  id: number;
  fullName: string;
  phone: string;
  email: string;
  address: string;
  active: boolean;
  isMenber: boolean;
  avatar: string;
  roles: string;
};

type AttibulteType = {
  name: string;
  values: string[];
};
