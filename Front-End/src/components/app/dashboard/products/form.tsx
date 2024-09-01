"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Input as MyInput } from "@/components/ui/input";
import {
  Checkbox,
  Form,
  Input,
  InputNumber,
  Select,
  Spin,
  message,
} from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { FaCamera } from "react-icons/fa";
import {
  createProduct,
  getAttributesByCategory,
  updateProduct,
} from "@/services/product";
import { AiFillProduct } from "react-icons/ai";
import Image from "next/image";
import { getbrandsByCategory } from "@/services/brand";
import { uploadProductImage } from "@/services/upload";
import useAction from "@/hooks/useAction";
import { useAppSelector } from "@/redux/store";

type FormField = {
  name: string;
  price: number;
  discount: number;
  stock: number;
  description: string;
  active: boolean;
  brandId: number;
  categoryId: number;
  discountForMember: number;
};

type Attribute = { attribute: string; value?: string; label: string };

export default function ProductForm({
  categories,
  product,
  _brands,
}: {
  product?: Product;
  categories: CategoryType[];
  _brands?: BrandType[];
}): React.JSX.Element {
  const [file, setFile] = useState<File | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [category, setCategory] = useState<string | null>(null);
  const [brands, setBrands] = useState<BrandType[]>([]);
  // const [attributes, setAttributes] = useState<AttibulteResponse[]>([]);
  const [attributesDatas, setAttributesDatas] = useState<Attribute[]>([]);

  useEffect(() => {
    if (product) {
      setImage(product.image);
      setAttributesDatas(product.attributes);
    }
  }, [product]);

  useEffect(() => {
    if (_brands) setBrands(_brands);
  }, [_brands]);
  const [isFetching, setFetching] = useState<boolean>(false);
  useEffect(() => {
    const fetchData = async () => {
      setFetching(true);
      try {
        if (category) {
          const [_brands, _attributes] = await Promise.all([
            getbrandsByCategory(category),
            getAttributesByCategory(category),
          ]);
          setBrands(_brands);
          const _attributesData = _attributes.map((item) => ({
            attribute: item.name,
            value: undefined,
            label: item.label,
          }));
          setAttributesDatas(_attributesData);
        }
      } finally {
        setFetching(false);
      }
    };

    fetchData();
  }, [category]);

  const handleChangeCategory = (value: number) => {
    const _category = categories.find((category) => category.id === value);
    if (_category) setCategory(_category.name);
  };

  // xử lý ảnh trước upload
  const handleAddImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
      setImage(URL.createObjectURL(file));
    }
  };

  // tạo giá trị form mặc định nếu là edit product
  const initialValues = {
    name: product?.name,
    description: product?.description,
    active: product?.active || true,
    price: product?.price || 0,
    discount: product?.discount || 0,
    discountForMember: product?.discountForMember || 0,
    stock: product?.stock || 0,
    categoryId: product?.category.id,
    brandId: product?.brand.id,
  };
  // xử lý submit
  const [form] = Form.useForm();
  const router = useRouter();
  const [response, isCreating, _createProduct] = useAction(createProduct);
  const [responseUpload, uploading, _uploadProductImage] =
    useAction(uploadProductImage);
  const [responseUpdate, isUpdating, _updateProduct] = useAction(updateProduct);
  const isPending = isCreating || uploading || isUpdating;
  const isDemo = !!useAppSelector(
    (state) => state.userInfo.user
  )?.roles.includes("demo");
  const onFinish = async (productForm: FormField) => {
    if (isDemo) message.warning("Chỉ được phép xem");
    else {
      const attributes = attributesDatas.filter((item) => item.value);
      if (product) {
        if (product.id < 413) message.error("Không được phép sửa sản phẩm gốc");
        else {
          const data = product
            ? {
                ...product,
                ...productForm,
                attributes,
              }
            : {
                ...productForm,
                attributes,
              };
          // @ts-ignore
          const res = await _updateProduct(data, product.id);
          if (res) {
            if (file) {
              const newProductId = res.data.id;
              const formData = new FormData();
              formData.append("files", file);
              const resUpload = await _uploadProductImage(
                formData,
                newProductId
              );
              if (resUpload) router.push("/dashboard/products");
            }
            router.push("/dashboard/products");
          }
        }
      } else {
        if (!file) message.warning("Vui lòng chọn ảnh");
        else {
          const data = {
            ...productForm,
            attributes,
          };
          // @ts-ignore
          const res = await _createProduct(data);
          if (res) {
            const newProductId = res.data.id;
            const formData = new FormData();
            formData.append("files", file);
            const resUpload = await _uploadProductImage(formData, newProductId);
            if (resUpload) router.push("/dashboard/products");
          }
        }
      }
    }
  };

  const handleChangeAttribute = (
    e: React.ChangeEvent<HTMLInputElement>,
    attribute: string
  ) => {
    const value = e.target.value;
    const preAtributeIndex = attributesDatas.findIndex(
      (item) => item.attribute == attribute
    );
    if (preAtributeIndex >= 0) {
      const newValue = attributesDatas;
      newValue[preAtributeIndex].value = value;
      const newState = [...newValue];
      setAttributesDatas(newState);
    }
  };

  return (
    <>
      <Spin spinning={isPending || isFetching}>
        <Form
          form={form}
          name="productForm"
          onFinish={onFinish}
          scrollToFirstError
          size="large"
          initialValues={initialValues}
        >
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
              },
            ]}
          >
            <Select placeholder="Category (*)" onChange={handleChangeCategory}>
              {categories &&
                categories.map((category) => (
                  <Select.Option key={category.name} value={category.id}>
                    {category.label}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="brandId"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn thương hiệu",
              },
            ]}
          >
            <Select placeholder="Brand (*)">
              {brands &&
                brands.map((brand) => (
                  <Select.Option key={brand.name} value={brand.id}>
                    {brand.name}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>

          {attributesDatas.map((item) => (
            <Form.Item key={`${item.attribute}`}>
              <Input
                onChange={(e) => handleChangeAttribute(e, item.attribute)}
                prefix={`${item.label}: `}
                defaultValue={item.value}
              />
            </Form.Item>
          ))}

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

          <Form.Item>
            <div className="pt-3 flex gap-4">
              <div className="flex gap-4">
                {image && (
                  <div className="size-32 mr-5">
                    <Image
                      width={128}
                      height={128}
                      alt={image}
                      src={image}
                      className="size-32 rounded-xl object-cover"
                    />
                  </div>
                )}
                <label
                  htmlFor="files"
                  className="size-32 flex flex-col gap-3 items-center justify-center cursor-pointer border border-dashed rounded-lg bg-white"
                >
                  <FaCamera size={24} />
                  <b className="text-sm">{image ? "Thay đổi" : "Tải lên"}</b>
                </label>
              </div>
              <MyInput
                onChange={handleAddImage}
                accept="image/*"
                name="files"
                id="files"
                type="file"
                className="!hidden"
              />
            </div>
          </Form.Item>

          <Form.Item valuePropName="checked" name="active">
            <Checkbox>Mở bán</Checkbox>
          </Form.Item>

          <div className="flex gap-5 justify-end">
            <Link href="/dashboard/products">
              <Button
                className="bg-gray-400 hover:bg-gray-400 hover:opacity-80"
                type="button"
              >
                Cancel
              </Button>
            </Link>
            <Button className="bg-blue-600 hover:bg-blue-500" type="submit">
              {product ? "Update" : "Create product"}
            </Button>
          </div>
        </Form>
      </Spin>
    </>
  );
}
