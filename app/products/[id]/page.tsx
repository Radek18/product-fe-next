import ProductDetail from "@/components/products/product-detail";
import { getProduct } from "@/lib/product-data";

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const product = await getProduct(Number(params.id));

  return <ProductDetail product={product} />;
}
