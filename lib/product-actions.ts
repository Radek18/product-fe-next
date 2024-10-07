"use server";

import axios from "axios";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";

const API_URL = "/api/products";

export async function createProduct(formData: FormData) {
  const { accessToken } = (await auth()) || {};

  const product = {
    partNo: Number(formData.get("partNo")),
    name: formData.get("name"),
    description: formData.get("description"),
    price: Number(formData.get("price")),
    isForSale: !!formData.get("isForSale"),
  };

  try {
    await axios.post(`${process.env.BACKEND_URL}${API_URL}`, product, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  } catch (err) {
    console.error(err);
    throw new Error("Failed to create product.");
  }

  revalidatePath("/products");
  redirect("/products");
}

export async function updateProduct(id: number, formData: FormData) {
  const { accessToken } = (await auth()) || {};

  const product = {
    id,
    partNo: Number(formData.get("partNo")),
    name: formData.get("name"),
    description: formData.get("description"),
    price: Number(formData.get("price")),
    isForSale: !!formData.get("isForSale"),
  };

  try {
    await axios.put(`${process.env.BACKEND_URL}${API_URL}/${id}`, product, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  } catch (err) {
    console.error(err);
    throw new Error("Failed to update product.");
  }

  revalidatePath(`/products/${id}`);
}

export async function deleteProduct(id: number) {
  const { accessToken } = (await auth()) || {};

  try {
    await axios.delete(`${process.env.BACKEND_URL}${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  } catch (err) {
    console.error(err);
    throw new Error("Failed to delete product.");
  }

  revalidatePath("/products");
}
