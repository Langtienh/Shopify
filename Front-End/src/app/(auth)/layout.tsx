import HeaderAuth from "@/app/(auth)/_components/header/auth.header";
import BackBtn from "./_components/btn.back";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="max-w-[1400px] mx-auto relative pb-20">
      <div>
        <HeaderAuth />
      </div>
      <main className="text-[#444444] max-w-[680px] mx-auto w-full px-2 pt-16">
        <div className="w-full p-[10px]">
          <BackBtn />
        </div>
        {children}
      </main>
    </div>
  );
}
