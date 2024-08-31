"use client";
import BackBtn from "@/components/app/auth/btn.back";
import { Button, Checkbox, Form, FormProps, Input, Radio, Spin } from "antd";
import { createAddress } from "@/services/address";
import { useRouter } from "next/navigation";
import AddressForm from "@/components/global/address/form";
import useAction from "@/hooks/useAction";
import { useEffect } from "react";

type FieldType = {
  provinceCode: string;
  districtCode: string;
  wardCode: string;
  default: boolean;
  detail: string;
  name: string;
};

export default function Page() {
  const initialForm = {
    default: false,
  };
  const [data, isPending, createAddressFc] = useAction(createAddress);
  const router = useRouter();

  const handleSubmit: FormProps<FieldType>["onFinish"] = async (address) => {
    const _address = {
      code: address.wardCode,
      default: address.default,
      detail: address.detail,
      name: address.name,
    };
    // todo mesage
    await createAddressFc(_address);
  };
  useEffect(() => {
    if (data) router.push("/smember/user-info/address-info");
  }, [data, router]);

  return (
    <>
      <div className="flex gap-5 items-center pb-5">
        <BackBtn />
        <p className="text-[22px] font-bold py-2">Thêm địa chỉ mới</p>
      </div>
      <Spin spinning={isPending}>
        <Form
          initialValues={initialForm}
          onFinish={handleSubmit}
          size="large"
          name="address"
        >
          <Form.Item>
            <Radio.Group>
              <Radio value="a">Nhà riêng</Radio>
              <Radio value="b">Công ty</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item<FieldType>
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập tên gợi nhớ" }]}
          >
            <Input placeholder="Đặt tên gợi nhớ (ví dụ Nhà)" />
          </Form.Item>

          <AddressForm />

          <Form.Item<FieldType> name="default" valuePropName="checked">
            <Checkbox>Đặt làm mặc định</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button htmlType="submit" type="primary" danger className="w-full">
              Xác nhận thêm địa chỉ
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </>
  );
}
