import { Breadcrumbs } from "@/components/app/dashboard";
import TableProductDeleted from "@/components/app/dashboard/products/deleted/table";
import { getProductDeleted } from "@/services/product/query";
type Props = {
  searchParams: {
    page?: number;
    limit?: number;
  };
};
export default async function Page({ searchParams: { limit, page } }: Props) {
  const { products, totalItem } = await getProductDeleted();

  return (
    <>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Products", href: "/dashboard/products" },
          {
            label: "Deleted",
            href: "/dashboard/products/deleted",
            active: true,
          },
        ]}
      />
      <TableProductDeleted
        totalItem={totalItem}
        products={products}
        page={page}
        limit={limit}
      />
    </>
  );
}
