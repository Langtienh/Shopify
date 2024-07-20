import BackBtn from "../_components/btn.back";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="text-[#444444] max-w-[680px] mx-auto w-full px-2  pb-20">
      <div className="w-full p-[10px]">
        <BackBtn />
      </div>
      {children}
    </div>
  );
}
