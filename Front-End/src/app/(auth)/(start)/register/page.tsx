import RegesterForm from "@/app/(auth)/_components/register/regester.form";
import AuthTitle from "@/app/(auth)/_components/title";

export default async function Page() {
  return (
    <>
      <AuthTitle title="Đăng kí với" />
      <RegesterForm />
    </>
  );
}
