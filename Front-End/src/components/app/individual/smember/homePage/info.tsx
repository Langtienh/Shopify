import { Image } from "antd";

export default function UserInfo({ user }: { user: User }) {
  return (
    <>
      <div className="flex gap-4 items-center w-full">
        <div className="size-[74px] flex-shrink-0 rounded-full border-2 border-purple-800 bg-white">
          <Image
            className="rounded-full"
            width={70}
            height={70}
            src={user?.avatar || "/images/default/avatar.jpg"}
            fallback="/images/default/avatar.jpg"
            alt="avatar"
          />
        </div>
        <div className="flex-1 w-full flex flex-col gap-1">
          <h2 className="text-[24px] font-bold text-[#ac3c8e] capitalize">
            {user.fullName}
          </h2>
          <p className="text-gray-500 text-sm">{user.phone}</p>
        </div>
        <span className="ms-auto text-red-600 font-bold py-1 px-3 border-2 border-red-600 rounded-xl">
          Smember
        </span>
      </div>
    </>
  );
}
