import { getProductOption } from "@/actions/product.services";

export default async function ProductTable() {
  const [products, totalItem] = await getProductOption();
  return (
    <div className="mt-5 bg-white border rounded-xl shadow-xl p-3">table</div>
  );
}
