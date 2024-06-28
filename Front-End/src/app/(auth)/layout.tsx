export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="max-w-[1280px] mx-auto relative">
      <main className="text-[#444444] max-w-[1200px] mx-auto w-full px-2">
        {children}
      </main>
    </div>
  );
}
