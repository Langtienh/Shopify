import LoginForm from "@/components/auth/login.form";
import AuthTitle from "@/components/auth/title";

export default function Page() {
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
