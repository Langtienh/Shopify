"use client";
import React, { useEffect, useState } from "react";
import { Form, Select } from "antd";
import {
  getDistrictByParentCode,
  getWardByParentCode,
  getProvinceAll,
} from "@/services/vnAPI.services";

const { Option } = Select;

export const Address = () => {
  const [provinces, setProvinces] = useState<provinceType[]>([]);
  const [provinceCode, setProvinceCode] = useState<string | undefined | null>(
    null
  );

  const [districts, setDistricts] = useState<districtType[]>([]);
  const [districtCode, setDistrictCode] = useState<string | undefined | null>(
    null
  );

  const [wards, setWards] = useState<wardType[]>([]);
  const [wardCode, setWardCode] = useState<string | undefined | null>(null);

  useEffect(() => {
    const fetchProvince = async () => {
      const data = await getProvinceAll();
      setProvinces(data);
    };
    fetchProvince();
  }, []);

  useEffect(() => {
    if (provinceCode) {
      const fetchDistricts = async () => {
        const data = await getDistrictByParentCode(provinceCode);
        setDistricts(data);
      };
      fetchDistricts();
      setDistrictCode(null); // Reset huyện khi thay đổi tỉnh
      setWards([]); // Reset xã khi thay đổi tỉnh
      setWardCode(null); // Reset mã xã khi thay đổi tỉnh
    } else {
      setDistricts([]);
      setDistrictCode(null);
      setWards([]);
      setWardCode(null);
    }
  }, [provinceCode]);

  useEffect(() => {
    if (districtCode) {
      const fetchWards = async () => {
        const data = await getWardByParentCode(districtCode);
        setWards(data);
      };
      fetchWards();
      setWardCode(null); // Reset xã khi thay đổi huyện
    } else {
      setWards([]);
      setWardCode(null);
    }
  }, [districtCode]);
  return (
    <div className="grid grid-cols-3 gap-3">
      <Form.Item
        name="province"
        rules={[{ required: true, message: "Vui lòng chọn Tỉnh/Thành phố" }]}
      >
        <Select
          value={provinceCode}
          onChange={(v) => setProvinceCode(v)}
          placeholder="Tỉnh/Thành phố"
        >
          {provinces.map((item) => (
            <Option key={item.code} value={item.code}>
              {item.name}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        name="district"
        dependencies={["province"]}
        rules={[
          { required: true, message: "Vui lòng chọn Quận/Huyện" },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (districtCode) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("Vui lòng chọn lại"));
            },
          }),
        ]}
      >
        <Select
          value={districtCode}
          onChange={(v) => setDistrictCode(v)}
          placeholder="Quận/Huyện"
          disabled={!provinceCode}
        >
          {districts.map((item) => (
            <Option key={item.code} value={item.code}>
              {item.name}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        name="ward"
        dependencies={["district"]}
        rules={[
          { required: true, message: "Vui lòng chọn Phường/Xã" },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (wardCode) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("Vui lòng chọn lại"));
            },
          }),
        ]}
      >
        <Select
          value={wardCode}
          onChange={(v) => setWardCode(v)}
          placeholder="Phường/Xã"
          disabled={!districtCode}
        >
          {wards.map((item) => (
            <Option key={item.code} value={item.code}>
              {item.name}
            </Option>
          ))}
        </Select>
      </Form.Item>
    </div>
  );
};
