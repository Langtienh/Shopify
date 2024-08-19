"use client";
import React, { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  Form,
  GetProp,
  Input,
  message,
  Spin,
  Upload,
  UploadFile,
  UploadProps,
} from "antd";
import Link from "next/link";
import { register } from "@/services/auth";
import { openNotification } from "@/lib/nofication";
import { useRouter } from "next/navigation";
import { DELAY } from "@/lib/utils2";
import RenderIf from "@/components/global/renderif";
import { Button as MyButton } from "@/components/ui/button";
import { FaFileUpload } from "react-icons/fa";
import { IUser } from "@/auth/next-auth";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

export default function RegesterForm({
  isCreateByAdmin,
  user,
}: {
  isCreateByAdmin?: boolean;
  user?: IUser;
}) {
  // khởi tạo giá trị mặc định
  const initialValues = {
    agreement: true,
    fullName: user?.fullName,
    email: user?.email,
    phone: user?.phone,
  };

  const [form] = Form.useForm();
  // xử lý đăng kí
  const router = useRouter();
  const onFinish = async (values: RegisterForm) => {
    setLoading(true);
    console.log(values);
    // const res = await register(values);
    // if (res.status === 201) {
    //   openNotification({
    //     message: res.message || "Đăng kí thành công",
    //     description: "Đăng nhập để tiếp tục",
    //     notificationType: "success",
    //   });
    //   await DELAY(1000);

    //   router.push("/login");
    // } else {
    //   openNotification({
    //     message: res.message || "Đăng kí thất bại",
    //     description: "Tài khoản đã tồn tại hoặc không hợp lệ",
    //     notificationType: "error",
    //   });
    // }
    setLoading(false);
  };

  // xử lý trước upload
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  useEffect(() => {
    if (user) {
      const _upload = {
        uid: user.fullName as string,
        name: user.fullName as string,
        url: user.avatar as string,
      };
      setFileList([_upload]);
    }
  }, [user]);

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

  const [loading, setLoading] = useState<boolean>(false);
  return (
    <Spin spinning={loading}>
      <Form
        form={form}
        name="register"
        onFinish={onFinish}
        scrollToFirstError
        size="large"
        initialValues={initialValues}
      >
        <Form.Item
          name="avatar"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <>
            <Upload
              accept="image/png, image/jpeg"
              // action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
              listType="picture-circle"
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
        </Form.Item>
        <Form.Item
          name="fullName"
          rules={[
            {
              required: true,
              message: "Vui lòng điền họ tên đầy đủ!",
              whitespace: true,
            },
          ]}
        >
          <Input placeholder="Nhập tên" />
        </Form.Item>

        <Form.Item
          name="phone"
          rules={[{ required: true, message: "Vui lòng điền số điện thoại!" }]}
        >
          <Input type="phone" placeholder="Nhập số điện thoại" />
        </Form.Item>

        <Form.Item
          name="email"
          rules={[
            {
              type: "email",
              message: "Sai định dạnh ví dụ user@gmail.com",
            },
            {
              required: true,
              message: "Vui lòng điền email!",
            },
          ]}
        >
          <Input placeholder="Nhập email" />
        </Form.Item>

        {/* <Form.Item
          name="avatar"
          rules={[
            {
              required: true,
              message: "Vui lòng thêm ảnh đại diện!",
              whitespace: true,
            },
          ]}
        >
          <Input
            allowClear
            placeholder="Địa chỉ ảnh đại diện ví dụ https://My Avata.png"
          />
        </Form.Item> */}
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Vui lòng điền mật khẩu!",
            },
          ]}
          hasFeedback
        >
          <Input.Password placeholder="Nhập mật khẩu" />
        </Form.Item>

        <Form.Item
          name="confirm"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Xác nhận lại mật khẩu!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("Mật khẩu mới mà bạn đã nhập không khớp!")
                );
              },
            }),
          ]}
        >
          <Input.Password placeholder="Nhập lại mật khẩu" />
        </Form.Item>
        <RenderIf renderIf={!isCreateByAdmin}>
          <Form.Item
            name="agreement"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject(
                        new Error("Vui lòng đọc và chấp nhận thỏa thuận")
                      ),
              },
            ]}
          >
            <Checkbox>
              <span className="">
                Tôi đồng ý với các điều khoản bảo mật cá nhân
              </span>
            </Checkbox>
          </Form.Item>
        </RenderIf>

        <Form.Item>
          <>
            <RenderIf renderIf={!isCreateByAdmin}>
              <Button
                type="primary"
                danger
                htmlType="submit"
                className="w-full"
              >
                Đăng kí
              </Button>
            </RenderIf>
            <RenderIf renderIf={isCreateByAdmin}>
              <div className="flex gap-5 justify-end">
                <Link href="/dashboard/users">
                  <MyButton
                    className="bg-gray-400 hover:bg-gray-400 hover:opacity-80"
                    type="button"
                  >
                    Cancel
                  </MyButton>
                </Link>
                <MyButton
                  className="bg-blue-600 hover:bg-blue-500"
                  type="submit"
                >
                  Create user
                </MyButton>
              </div>
            </RenderIf>
          </>
        </Form.Item>
        <RenderIf renderIf={!isCreateByAdmin}>
          <p className="text-center my-5">
            <span className="font-semibold text-sm text-gray-500">
              Đã có có tài khoản
            </span>{" "}
            <Link className="text-red-500 font-bold" href="/login">
              Đăng nhập
            </Link>
          </p>
        </RenderIf>
      </Form>
    </Spin>
  );
}
