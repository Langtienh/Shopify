// java type to javascrip type
type Long = number;
type Double = number;
type int = number;
type TResponse = {
  status: int;
  message: string;
};
type PageResponse<T> = {
  page: int;
  limit: int;
  totalPage: int;
  totalItem: int;
  result: T[];
};

type ResponseSuccess<T> = {
  status: int;
  message: string;
  data: T;
};

type ResponseError = {
  status: int;
  message: string;
};

type LocalDateTime = string;
type List<T> = T[];
type CartItemResponse = {
  id: Long;
  productId: Long;
  name: string;
  image: string;
  price: Double;
  quantity: Long;
};
type CartResponse = {
  id: Long;
  total: Double;
  totalProduct: Long;
  totalQuantity: Long;
  cartItems: List<CartItemResponse>;
};

type CommentResponse = {
  id: Long;
  content: string;
  rate: Long;
  userId: Long;
  productId: Long;
};

type OrderDetailResponse = {
  id: Long;
  orderId: Long;
  productId: Long;
  name: string;
  image: string;
  price: Double;
  quantity: Long;
};

type OrderResponse = {
  id: Long;
  fullName: string;
  phone: string;
  email: string;
  address: string;
  orderDate: LocalDateTime;
  totalPrice: Double;
  orderStatus: OrderStatus;
  active: boolean;
  userId: Long;
};
type OrderStatus =
  | "PENDING"
  | "PROCESSING"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED";
type CategoryResponse = {
  id: Long;
  name: string;
};
type BrandResponse = {
  id: Long;
  name: string;
};
type CategoryBrandResponse = {
  id: Long;
  brand: string;
  category: string;
};
type ProductResponse = {
  id: Long;
  name: string;
  price: Double;
  discount: Long;
  stock: Long;
  viewCount: Long;
  description: string;
  image: string;
  discountForMember: Double;
  active: boolean;
  brand: string;
  category: string;
};

type UserResponse = {
  id: Long;
  fullName: string;
  phone: string;
  email: string;
  address: string;
  active: boolean;
  isMenber: boolean;
  avatar: string;
  roles: string;
};

type LoginResponse = {
  token: string;
  refreshToken: string;
  tokenType: string;
  user: UserResponse;
};

type UpdateSession = {
  token: string;
  refreshToken: string;
  user: UserResponse;
};

type AttibulteResponse = {
  name: string;
  values: string[];
};
