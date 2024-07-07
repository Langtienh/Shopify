import RegesterForm from "@/components/auth/regester.form";
import AuthTitle from "@/components/auth/title";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function Page() {
  const userCookie = cookies().get("user");
  if (userCookie) redirect("/");
  return (
    <>
      <AuthTitle title="Đăng kí với" />
      <RegesterForm />
    </>
  );
}
