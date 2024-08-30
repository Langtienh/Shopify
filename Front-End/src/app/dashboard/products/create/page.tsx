import { Breadcrumbs } from "@/components/app/dashboard";
import ProductForm from "@/components/app/dashboard/products/form";
import { getAllCategory } from "@/services/category";

export default async function Page() {
  const categories = await getAllCategory();
  return (
    <>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Products", href: "/dashboard/products" },
          {
            label: "Create Product",
            href: `/dashboard/products/create`,
            active: true,
          },
        ]}
      />
      <ProductForm categories={categories} />
    </>
  );
}
