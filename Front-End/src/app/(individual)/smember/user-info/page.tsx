import UpdateUserForm from "@/components/app/individual/smember/user-info/form";
import { getMyInfo } from "@/services/user";
import Image from "next/image";

export default async function Page() {
  const user = await getMyInfo();
  return (
    <div className="pb-[200px] pt-10 w-full max-w-[600px] mx-auto">
      <div className="flex flex-col justify-center items-center">
        <Image
          width={80}
          height={80}
          alt={user.fullName as string}
          src={user.avatar as string}
          className="size-20 rounded-full"
        />
        <h2 className="font-bold capitalize mb-10">{user.fullName}</h2>
      </div>
      <UpdateUserForm user={user} />
    </div>
  );
}
