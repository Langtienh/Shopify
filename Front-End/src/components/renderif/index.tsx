export default function RenderIf({
  children,
  renderIf,
}: Readonly<{
  children: React.ReactNode;
  renderIf: boolean;
}>) {
  if (renderIf) return children;
  return null;
}
