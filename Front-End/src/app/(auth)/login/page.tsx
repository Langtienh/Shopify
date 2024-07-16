import LoginForm from "@/app/(auth)/_components/login/login.form";
import AuthTitle from "@/app/(auth)/_components/title";
export default async function Page() {
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
