import { LoginForm } from "@/components/app/auth/login";
import AuthTitle from "@/components/app/auth/title";
import LogoutTrigger from "@/components/trigger/logout";
export default async function Page() {
  return (
    <>
      <LogoutTrigger />
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
