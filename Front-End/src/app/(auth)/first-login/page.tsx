import FirstLoginForm from "@/app/(auth)/_components/firstlogin/form.first";
import { auth } from "@/auth/auth";
import Image from "next/image";

export default async function Page() {
  const session = await auth();
  if (session?.user)
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
        <FirstLoginForm user={session.user} />
      </>
    );
  return <>Server hông tìm thấy thông tin tài khoản</>;
}
