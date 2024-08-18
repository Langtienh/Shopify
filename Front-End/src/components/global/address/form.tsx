"use client";

import {
  getDistrictByParentCode,
  getWardByParentCode,
} from "@/services/address.helper";
import { Select, Form, Input } from "antd";
import { useEffect, useState } from "react";
import { provinces } from "@/hard-coding/address";

export default function AddressForm() {
  const [provinceCode, setProvinceCode] = useState<string | undefined | null>(
    null
  );

  const [districts, setDistricts] = useState<districtType[]>([]);
  const [districtCode, setDistrictCode] = useState<string | undefined | null>(
    null
  );

  const [wards, setWards] = useState<wardType[]>([]);

  useEffect(() => {
    setDistrictCode(null);
    setWards([]);
    if (provinceCode) {
      const _districts = getDistrictByParentCode(provinceCode);
      setDistricts(_districts);
    } else {
      setDistricts([]);
    }
  }, [provinceCode]);

  useEffect(() => {
    if (districtCode) {
      const _ward = getWardByParentCode(districtCode);
      setWards(_ward);
    } else setWards([]);
  }, [districtCode]);

  return (
    <>
      <Form.Item
        name="provinceCode"
        rules={[{ required: true, message: "Vui lòng chọn tỉnh/thành phố" }]}
      >
        <Select
          placeholder="Chọn tỉnh/thành phố (*)"
          onChange={(provinceCode) => setProvinceCode(provinceCode)}
        >
          {provinces.map((province) => (
            <Select.Option key={province.code} value={province.code}>
              {province.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        name="districtCode"
        rules={[{ required: true, message: "Vui lòng chọn quận/huyện" }]}
      >
        <Select
          disabled={!districts.length}
          placeholder="Chọn quận/huyện(*)"
          onChange={(districtCode) => setDistrictCode(districtCode)}
        >
          {districts.map((district) => (
            <Select.Option key={district.code} value={district.code}>
              {district.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        name="wardCode"
        rules={[{ required: true, message: "Vui lòng chọn phường/xã" }]}
      >
        <Select disabled={!wards.length} placeholder="Chọn phường/xã (*)">
          {wards.map((ward) => (
            <Select.Option key={ward.code} value={ward.code}>
              {ward.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        name="detail"
        rules={[{ required: true, message: "Vui lòng nhập số nhà/tên đường " }]}
      >
        <Input placeholder="Nhập số nhà/tên đường (*)" />
      </Form.Item>
    </>
  );
}
