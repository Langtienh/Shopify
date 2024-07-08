import LoginForm from "@/components/auth/login.form";
import AuthTitle from "@/components/auth/title";

import { redirect } from "next/navigation";
export default async function Page() {
  // const session = await getServerSession(authOptions);
  // if (session?.user) redirect("/");
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
