type RegisterDTO = {
  fullName: string;
  phone: string;
  password: string;
  email: string;
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
  price: number;
  discount: number;
  stock: number;
  description: string;
  active: boolean;
  brandId: number;
  categoryId: number;
  discountForMember: number;
  attributes?: { attribute: string; value: string }[];
};

type OrderDTO = {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  userId: number;
};

type CommentDTO = {
  content: string;
  rate: number;
  userId: number;
  productId: number;
};

type CategoryDTO = {
  name: string;
};

type CartItemDTO = {
  id: number;
  productId: number;
  quantity: number;
};

type BrandDTO = {
  name: string;
};

type AttributeDTO = {
  name: string;
};

type paymentInfoType = {
  fullName?: string | null;
  email?: string | null;
  phone?: string;
  address?: string;
};
