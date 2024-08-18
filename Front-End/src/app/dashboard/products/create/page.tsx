import { Breadcrumbs } from "@/components/app/dashboard";
import ProductForm from "@/components/app/dashboard/products/form";

export default async function Page() {
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
      <ProductForm />
    </>
  );
}
