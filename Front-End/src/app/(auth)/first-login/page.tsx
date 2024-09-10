import { FirstLoginForm } from "@/components/app/auth/firstLogin";
import { auth } from "@/auth/auth";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth();
  const user = session?.user;
  if (!user) redirect("/login");
  else
    return (
      <>
        <div className="text-center">
          <Image
            className="mx-auto"
            src="/images/Shipper.png"
            alt="Shipper"
            width={230}
            height={230}
          />
          <h2 className="mt-[10px] mb-[30px] text-[22px] font-bold">
            Cập nhật thông tin tài khoản
          </h2>
        </div>
        <FirstLoginForm user={user} />
      </>
    );
}
