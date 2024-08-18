import { Breadcrumbs } from "@/components/app/dashboard";
import ProductForm from "@/components/app/dashboard/products/form";

export default async function Page({ params }: { params: { id: string } }) {
  return (
    <>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Products", href: "/dashboard/products" },
          {
            label: "Edit Product",
            href: `/dashboard/products/edit`,
            active: true,
          },
        ]}
      />
      <ProductForm />
    </>
  );
}
