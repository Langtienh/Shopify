import { getProductOption } from "@/actions/product.services";
import ProductList from "@/components/product/list/product.list";
import MyPagination from "@/components/pagination/pagination";
import { DELAY } from "@/lib/ultils";

import { ProductListPage } from "@/app/(guiest)/(base)/products/[...slug]/page";
const delaynum = +process.env.DELAY_GET_PRODUCT! || 1000;
export default async function ProductsListPage(props: ProductListPage) {
  await DELAY(delaynum);
  const [products, totalItem] = await getProductOption(
    props.limit,
    props.page,
    props.sort,
    props.category,
    props.filters,
    props.brand
  );
  return (
    <>
      <ProductList products={products} />
      <MyPagination
        current={props.page}
        pageSize={props.limit}
        total={totalItem}
      />
    </>
  );
}
