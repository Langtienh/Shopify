import ProductTableSkeleton from "@/app/_components/admin/dashboard/products/table.skeleton";

export default function Loading() {
  return (
    <div className="grid gap-5 lg:grid-cols-2 animate-pulse">
      <div className="bg-gray-100 border rounded-xl h-[470px] shadow-xl" />
      <div className="bg-gray-100 border rounded-xl h-[470px] shadow-xl" />
      <div className="bg-gray-100 border rounded-xl h-[470px] lg:col-span-2 shadow-xl">
        <ProductTableSkeleton />
      </div>
    </div>
  );
}
