import ProductItem from "@/components/products/product-item";
import { getAllProducts } from "@/lib/product-data";
import { Product } from "@/lib/definitions";

export default async function ProductList() {
  const products = await getAllProducts();
  products.sort((a: Product, b: Product) => a.id - b.id);

  return (
    <ul className="m-5 flex flex-wrap justify-center gap-3">
      {products.map((product: Product) => (
        <ProductItem product={product} key={product.id} />
      ))}
    </ul>
  );
}
