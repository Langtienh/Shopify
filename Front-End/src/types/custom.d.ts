//
type RegisterForm = {
  fullName: string;
  phone: string;
  email: string;
  password: string;
  confirm: string;
  agreement: boolean;
};

type User = {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  active: boolean;
  roles: string[];
  avatar?: string;
  providerId?: number;
};
