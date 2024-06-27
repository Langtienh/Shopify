import { translateCategory } from "@/utils/translate";
import { Metadata } from "next";

type Props = {
  params: { category: string };
};

export async function generateMetadata({
  params,
}: Props): // parent: ResolvingMetadata
Promise<Metadata> {
  const t = translateCategory(params.category);
  return {
    title: `${t} 🔥🔥🔥`,
  };
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
