// Xã/Phường
type wardType = {
  id: string;
  name: string;
  type: string;
  slug: string;
  nameWithType: string;
  path: string;
  pathWithType: string;
  code: string;
  parentCode: string;
  isDeleted: boolean;
};
// Quận/Huyện
type districtType = {
  id: string;
  name: string;
  type: string;
  slug: string;
  nameWithType: string;
  path: string;
  pathWithType: string;
  code: string;
  parentCode: string;
  isDeleted: boolean;
};

// Tỉnh/Thành phố
type provinceType = {
  id: string;
  name: string;
  slug: string;
  type: string;
  nameWithType: string;
  code: string;
  isDeleted: boolean;
};
