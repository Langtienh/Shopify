import UpdateUserForm from "@/components/app/individual/smember/user-info/form";
import UploadAvatar from "@/components/app/individual/smember/user-info/upload";
import { getMyInfo } from "@/services/user";

export default async function Page() {
  const { user, addressDefautl } = await getMyInfo();
  return (
    <div className="pb-[200px] pt-10 w-full max-w-[600px] mx-auto">
      <div className="flex flex-col justify-center items-center">
        <UploadAvatar avatar={user.avatar} />
        <h2 className="font-bold capitalize mb-10">{user.fullName}</h2>
      </div>
      <UpdateUserForm addressDefault={addressDefautl?.path} user={user} />
    </div>
  );
}
