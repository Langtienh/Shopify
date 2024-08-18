import { provinces, districts, wards } from "@/hard-coding/address";

// tỉnh
export const getProvinceAll = () => provinces;

export const getProvinceByCode = (code: string) =>
  provinces.find((item) => item.code === code);

// huyện
export const getDistrictAll = () => districts;

export const getDistrictByCode = (code: string) =>
  districts.find((item) => item.code === code);

export const getDistrictByParentCode = (parentCode: string) =>
  districts.filter((item) => item.parentCode === parentCode);

//xã
export const getWardtAll = () => wards;

export const getWardtByCode = (code: string) =>
  wards.find((item) => item.code === code);

export const getWardByParentCode = (parentCode: string) =>
  wards.filter((item) => item.parentCode === parentCode);

export const getAddressDetail = (address?: string) => {
  if (address) {
    const strs = address.split(", ");
    const code = strs[1];
    const ward = getWardtByCode(code);
    if (ward) return strs[0] + ", " + ward.pathWithType;
    else return "Lỗi không tìm thấy địa chỉ";
  } else return "Lỗi không tìm thấy địa chỉ";
};

export const getAddressCode = (code: string) => {
  {
    const _code = code.split("-");
    const province = _code[0];
    const district = _code[3];
    const ward = _code[2];
    return { province, district, ward };
  }
};

export const wardCodeToPath = (wardCode: string) => {
  const res = wards.find((ward) => ward.code === wardCode);
  return res?.pathWithType;
};
