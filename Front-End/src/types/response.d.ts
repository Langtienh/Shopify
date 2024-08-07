// java type to javascrip type
type TResponse = {
  status: number;
  message: string;
};
type Page<T> = {
  page: number;
  limit: number;
  totalPage: number;
  totalItem: number;
  result: T[];
};

type ResponseSuccess<T> = {
  status: number;
  message: string;
  data: T;
};

type ResponseError = {
  status: number;
  message: string;
};

type LocalDateTime = string;
type List<T> = T[];
type CartItemResponse = CartItemType;
type CartResponse = CartType;
type LoveReponse = WishList;
type CommentResponse = CommentType;

type OrderDetailResponse = OrderDetailType;

type OrderResponse = OrderType;

type CategoryResponse = CategoryType;

type BrandResponse = BrandType;

type CategoryBrandResponse = CategoryBrandType;

type ProductResponse = Product;

type UserResponse = UserType;

type AttibulteResponse = AttibulteType;

type LoginResponse = {
  token: string;
  refreshToken: string;
  tokenType: string;
  user: UserResponse;
};

type checkTokenResponse = {
  token: string;
  userId: string;
};

type RefreshTokenResponse = {
  token: string;
  refreshToken: string;
  user: UserResponse;
};
