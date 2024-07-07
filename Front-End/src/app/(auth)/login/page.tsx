import LoginForm from "@/components/auth/login.form";
import AuthTitle from "@/components/auth/title";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
export default function Page() {
  const userCookie = cookies().get("user");
  if (userCookie) redirect("/");
  return (
    <>
      <AuthTitle title="Đăng nhập với" />
      <LoginForm />
      <div className=" text-center">
        <span className="text-red-500 font-bold border-b-2 border-red-500 cursor-pointer">
          Xem chính sách ưu đãi SMenber
        </span>
      </div>
    </>
  );
}
