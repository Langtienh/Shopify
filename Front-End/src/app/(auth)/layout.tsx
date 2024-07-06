import HeaderAuth from "@/components/header/authHeader";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="max-w-[1280px] mx-auto relative pb-20">
      <div>
        <HeaderAuth />
      </div>
      <main className="text-[#444444] max-w-[680px] mx-auto w-full px-2 pt-16">
        {children}
      </main>
    </div>
  );
}
