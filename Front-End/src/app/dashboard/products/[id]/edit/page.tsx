import { Breadcrumbs } from "@/components/app/dashboard";
import ProductForm from "@/components/app/dashboard/products/form";
import { getbrandsByCategory } from "@/services/brand";
import { getAllCategory } from "@/services/category";
import { getProductById } from "@/services/product";

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  const categories = await getAllCategory();
  const product = await getProductById(id);
  const brands = await getbrandsByCategory(product.category.name);
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
      <ProductForm product={product} categories={categories} _brands={brands} />
    </>
  );
}
