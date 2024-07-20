import HeaderAuth from "@/app/(auth)/_components/header/auth.header";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="max-w-[1400px] mx-auto">
      <HeaderAuth />
      <div className="pt-14">{children}</div>
    </main>
  );
}
