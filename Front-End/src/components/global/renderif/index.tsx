export default function RenderIf({
  children,
  renderIf,
}: Readonly<{
  children: React.ReactNode;
  renderIf: any;
}>) {
  if (renderIf) return children;
  return null;
}
