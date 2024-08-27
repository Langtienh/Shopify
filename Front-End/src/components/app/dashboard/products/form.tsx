"use client";
import React, { useState } from "react";
import {
  Checkbox,
  Form,
  Input,
  InputNumber,
  Select,
  Spin,
  Upload,
  GetProp,
  UploadFile,
  UploadProps,
  message,
} from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { FaFileUpload } from "react-icons/fa";
import { createProduct } from "@/services/product";
import { AiFillProduct } from "react-icons/ai";
import { MdOutlineAttachMoney } from "react-icons/md";
import { LuPercent } from "react-icons/lu";
import { converPriceToVN } from "@/lib/utils2";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

export default function ProductForm({
  product,
}: {
  product?: Product;
}): React.JSX.Element {
  // tạo giá trị mặc định
  const initialValues = {
    name: product?.name,
    description: product?.description,
    active: product?.active || true,
    price: product?.price || 0,
    discount: product?.discount || 0,
    discountForMember: product?.discountForMember || 0,
    stock: product?.stock || 0,
  };
  // xử lý submit
  const [form] = Form.useForm();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const onFinish = async (values: any) => {
    setLoading(true);
    const product = { ...values, "attributes[ram]": "11 GB" };
    const formData = new FormData();
    for (const name in product) {
      if (product.hasOwnProperty(name)) {
        formData.append(name, product[name]);
      }
    }
    const token = await createProduct();
    console.log("check", token);
    const res = await fetch("http://localhost:8080/api/v1/products", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    const data = await res.json();
    console.log(data);
    setLoading(false);
  };

  // xử lý ảnh trước upload
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const beforeUpload = (file: FileType) => {
    const imageType = ["image/jpeg", "image/png", "image/webp"];
    const isImage = imageType.includes(file.type);
    if (!isImage) {
      message.error(
        `${file.name} không phải là file ảnh hoặc chưa hỗ trợ định dạng file`
      );
      return isImage || Upload.LIST_IGNORE;
    }
    const isLt2M = file.size / 1024 / 1024 < 10;
    if (!isLt2M) {
      message.error("Hình ảnh phải nhỏ hơn 10MB!");
    }
    return isLt2M || Upload.LIST_IGNORE;
  };

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  return (
    <>
      <Spin spinning={loading}>
        <Form
          form={form}
          name="productForm"
          onFinish={onFinish}
          scrollToFirstError
          size="large"
          initialValues={initialValues}
        >
          {/* <Form.Item
            name="image"
            label="Image"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <>
              <Upload
                accept="image/png, image/jpeg"
                // action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                listType="picture-card"
                fileList={fileList}
                onChange={handleChange}
                maxCount={1}
                beforeUpload={beforeUpload}
              >
                <button style={{ border: 0, background: "none" }} type="button">
                  <div className="flex justify-center">
                    <FaFileUpload />
                  </div>

                  <div style={{ marginTop: 8 }}>Upload</div>
                </button>
              </Upload>
            </>
          </Form.Item> */}

          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên sản phẩm",
                whitespace: true,
              },
            ]}
          >
            <Input prefix={<AiFillProduct />} placeholder="Name (*)" />
          </Form.Item>

          <Form.Item
            name="categoryId"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn loại hàng",
                whitespace: true,
              },
            ]}
          >
            <Select placeholder="Category (*)">
              <Select.Option value="1">Red</Select.Option>
              <Select.Option value="2">Green</Select.Option>
              <Select.Option value="3">Blue</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="brandId"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn thương hiệu",
                whitespace: true,
              },
            ]}
          >
            <Select placeholder="Brand (*)">
              <Select.Option value="1">Red</Select.Option>
              <Select.Option value="2">Green</Select.Option>
              <Select.Option value="3">Blue</Select.Option>
            </Select>
          </Form.Item>

          <div className="flex flex-wrap gap-5 justify-between">
            <Form.Item name="price">
              <InputNumber
                style={{ minWidth: 140 }}
                prefix="Price:"
                formatter={(value) => `${value} đ`}
                // @ts-ignore
                parser={(value) =>
                  value?.replace(" đ", "") as unknown as number
                }
                className="min-w-[120px]"
                name="price"
                min={0}
                placeholder="0"
              />
            </Form.Item>

            <Form.Item name="discount">
              <InputNumber
                style={{ width: 120 }}
                prefix="Discount:"
                formatter={(value) => `${value}%`}
                // @ts-ignore
                parser={(value) => value?.replace("%", "") as unknown as number}
                name="discount"
                min={0}
                max={100}
                placeholder="0"
              />
            </Form.Item>

            <Form.Item name="discountForMember">
              <InputNumber
                style={{ width: 240 }}
                prefix="Discount For Member:"
                formatter={(value) => `${value} đ`}
                // @ts-ignore
                parser={(value) =>
                  value?.replace(" đ", "") as unknown as number
                }
                defaultValue={100}
                name="discountForMember"
                min={0}
                placeholder="0"
              />
            </Form.Item>
            <Form.Item name="stock">
              <InputNumber prefix="Stock:" name="stock" placeholder="0" />
            </Form.Item>
          </div>

          <Form.Item
            name="description"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mô tả",
                whitespace: true,
              },
            ]}
          >
            <Input.TextArea cols={2} placeholder="Description (*)" />
          </Form.Item>

          <Form.Item valuePropName="checked" name="active">
            <Checkbox>Mở bán</Checkbox>
          </Form.Item>

          <div className="flex gap-5 justify-end">
            <Button
              className="bg-gray-400 hover:bg-gray-400 hover:opacity-80"
              type="button"
            >
              Cancel
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-500" type="submit">
              Create product
            </Button>
          </div>
        </Form>
      </Spin>
    </>
  );
}

// const res = await register(form);
// if (res.status === 201) {
//   setTimeout(() => {

//   }, 2000);
//   router.push("/dashboard/products");
// } else {
// }
