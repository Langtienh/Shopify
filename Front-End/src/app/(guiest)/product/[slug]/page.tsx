export default async function Page({ params }: { params: { slug: string } }) {
  return <p>{params.slug}</p>;
}
