import axios from "axios";
import { auth } from "@/auth";

const API_URL = "/api/products";

export async function getAllProducts() {
  const { accessToken } = (await auth()) || {};

  try {
    const response = await axios.get(`${process.env.BACKEND_URL}${API_URL}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (err) {
    console.error(err);
    throw new Error("Failed to get all products.");
  }
}

export async function getProduct(id: number) {
  const { accessToken } = (await auth()) || {};

  try {
    const response = await axios.get(
      `${process.env.BACKEND_URL}${API_URL}/${id}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return response.data;
  } catch (err) {
    console.error(err);
    throw new Error("Failed to get product.");
  }
}
