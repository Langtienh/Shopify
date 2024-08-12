import { RegesterForm } from "@/components/app/auth/register";
import AuthTitle from "@/components/app/auth/title";

export default async function Page() {
  return (
    <>
      <AuthTitle title="Đăng kí với" />
      <RegesterForm />
    </>
  );
}
