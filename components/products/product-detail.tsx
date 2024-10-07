"use client";

import React, { useState } from "react";
import ProductForm from "@/components/products/product-form";
import { Product } from "@/lib/definitions";

export default function ProductDetail({ product }: { product: Product }) {
  const [activeProductForm, setActiveProductForm] = useState(false);

  const { partNo, name, description, price, isForSale } = product;

  return (
    <div className="mt-5 flex flex-col items-center gap-3">
      <p>č. {partNo}</p>

      <h3 className="text-xl font-bold">{name}</h3>

      <p>{description}</p>

      <h3 className="font-bold">
        {Math.round(price).toLocaleString("cs-CZ")} Kč
      </h3>

      <p className={`${isForSale ? "text-green-300" : "text-red-300"}`}>
        Skladem {isForSale ? "ANO" : "NE"}
      </p>

      <button
        className="mb-5 w-28 bg-blue-100 px-3 py-2 transition-all duration-300 hover:bg-blue-200"
        onClick={() =>
          setActiveProductForm((activeProductForm) => !activeProductForm)
        }
      >
        {!activeProductForm ? "Upravit" : "Zrušit"}
      </button>

      {activeProductForm && (
        <ProductForm
          product={product}
          setActiveProductForm={setActiveProductForm}
        />
      )}
    </div>
  );
}
