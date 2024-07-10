import RegesterForm from "@/components/auth/regester.form";
import AuthTitle from "@/components/auth/title";
import { config } from "@/lib/auth";
import { getServerSession } from "next-auth";

import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getServerSession(config);
  if (session?.user) redirect("/");
  return (
    <>
      <AuthTitle title="Đăng kí với" />
      <RegesterForm />
    </>
  );
}
