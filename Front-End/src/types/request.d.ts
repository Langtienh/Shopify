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

type ProductDTO = Omit<Product, ["id", "viewCount, active"]>;

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
