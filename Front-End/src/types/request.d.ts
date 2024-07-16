type RegisterDTO = {
  fullName: string;
  phone: string;
  password: string;
  email: string;
  address: string;
  avatar: string;
};

type FirstLoginDTO = {
  providerId: string;
  fullName: string;
  phone: string;
  email: string;
  avatar: string;
};

type LoginDTO = {
  phone: string;
  password: string;
};

type RefreshTokenDTO = {
  refreshToken: string;
};

type LogoutDTO = {
  token: string;
};

type ProductDTO = {
  name: string;
  price: Double;
  discount: Long;
  stock: Long;
  description: string;
  image: string;
  discountForMember: Double;
  active: boolean;
  brandId: Long;
  categoryId: Long;
};

type OrderDTO = {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  userId: Long;
};

type CommentDTO = {
  content: string;
  rate: Long;
  userId: Long;
  productId: Long;
};

type CategoryDTO = {
  name: string;
};
// type CartUpdateDTO= {
//    <CartItemDTO: List> cartItemDTOS;
// }
type CartItemDTO = {
  productId: Long;
  quantity: Long;
};
// type CartDTO= {
//     userId: Long;
//    <CartItemDTO: List> cartItemDTOS;
// }
type BrandDTO = {
  name: string;
};
type AttributeDTO = {
  name: string;
};
