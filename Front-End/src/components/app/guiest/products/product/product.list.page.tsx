import { getProduct } from "@/services/product";
import { ProductList } from "@/components/global/product";
import MyPagination from "@/components/global/pagination";
import { DELAY } from "@/lib/utils2";

import { ProductListPage } from "@/app/(guiest)/(base)/products/[...slug]/page";
const delaynum = +process.env.DELAY_GET_PRODUCT! || 1000;
export default async function ProductsListPage(props: ProductListPage) {
  await DELAY(delaynum);
  const { products, totalItem } = await getProduct(
    props.page,
    props.limit,
    props.category,
    props.brand,
    props.sort,
    props.filters
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
