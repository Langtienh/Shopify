import Trigger from "@/components/trigger";

export default function LayoutTrigger({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Trigger />
      {children}
    </>
  );
}
