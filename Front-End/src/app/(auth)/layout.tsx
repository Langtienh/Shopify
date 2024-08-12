import BackBtn from "@/components/app/auth/btn.back";
import HeaderAuth from "@/components/app/auth/header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <HeaderAuth />
      <div className="pt-14">
        <div className="text-[#444444] max-w-[680px] mx-auto w-full px-2  pb-20">
          <div className="w-full p-[10px]">
            <BackBtn />
          </div>
          {children}
        </div>
      </div>
    </>
  );
}
