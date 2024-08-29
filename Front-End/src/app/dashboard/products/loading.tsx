import ProductTableSkeleton from "@/components/app/dashboard/products/skeleton";
import { shimmer } from "@/components/global/skeleton";
export default function Loading() {
  return (
    // <div className={`${shimmer} grid gap-5 lg:grid-cols-2 animate-pulse`}>
    //   <div className="bg-gray-50 border rounded-xl h-[470px] shadow-xl" />
    //   <div className="bg-gray-50 border rounded-xl h-[470px] shadow-xl" />
    //   <div className="lg:col-span-2 shadow-xl">
    <ProductTableSkeleton />
    //   </div>
    // </div>
  );
}
