"use client";

import { createProduct, updateProduct } from "@/lib/product-actions";
import { Product } from "@/lib/definitions";

export default function ProductForm({
  product,
  setActiveProductForm,
}: {
  product?: Product;
  setActiveProductForm?: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { id, partNo, name, description, price, isForSale } = product || {};

  function handleSubmit() {
    if (setActiveProductForm) {
      setActiveProductForm(false);
    }
  }

  const updateProductWithId = updateProduct.bind(null, id as number);

  return (
    <div className="flex h-full items-center justify-center">
      <form
        className="flex w-56 flex-col gap-2"
        action={!product ? createProduct : updateProductWithId}
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col">
          <label htmlFor="partNo">Číslo</label>

          <input
            className="border-2 px-2 py-1 outline-none"
            type="number"
            id="partNo"
            name="partNo"
            defaultValue={partNo || ""}
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="name">Název</label>

          <input
            className="border-2 px-2 py-1 outline-none"
            type="text"
            id="name"
            name="name"
            defaultValue={name || ""}
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="description">Popis</label>

          <input
            className="border-2 px-2 py-1 outline-none"
            type="text"
            id="description"
            name="description"
            defaultValue={description || ""}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="price">Cena</label>

          <input
            className="border-2 px-2 py-1 outline-none"
            type="number"
            id="price"
            name="price"
            defaultValue={Math.round(price as number) || ""}
            required
          />
        </div>

        <div className="flex gap-3">
          <label htmlFor="isForSale">Skladem</label>

          <input
            type="checkbox"
            id="isForSale"
            name="isForSale"
            defaultChecked={isForSale || false}
          />
        </div>

        <div className="mt-5 flex justify-center">
          <button
            className="w-28 bg-blue-100 px-3 py-2 transition-all duration-300 hover:bg-blue-200"
            type="submit"
          >
            {!product ? "Uložit" : "Upravit"}
          </button>
        </div>
      </form>
    </div>
  );
}
