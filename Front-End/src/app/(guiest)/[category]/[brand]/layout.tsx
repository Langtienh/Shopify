import { translateCategory } from "@/utils/translate";
import { Metadata } from "next";

type Props = {
  params: { brand: string; category: string };
};
export async function generateMetadata({
  params,
}: Props): // parent: ResolvingMetadata
Promise<Metadata> {
  const t = translateCategory(params.category);
  return {
    title: `${t} ${params.brand} Chính hãng 🔥🔥🔥`,
  };
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
