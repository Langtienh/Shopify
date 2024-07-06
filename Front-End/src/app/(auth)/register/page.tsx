"use client";

import RegesterForm from "@/components/auth/regester.form";
import AuthTitle from "@/components/auth/title";

export default function Page() {
  return (
    <>
      <AuthTitle title="Đăng kí với" />
      <RegesterForm />
    </>
  );
}
