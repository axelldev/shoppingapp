import { Product } from "@/types/products";

export const API_URL = process.env.EXPO_PUBLIC_API_URL;

/**
 * Fetches all products from the API
 * @returns {Promise<Product[]>} A promise that resolves to an array of products
 * @throws {Error} When the API request fails
 */
export async function fetchProducts(): Promise<Product[]> {
  const response = await fetch(`${API_URL}/products`);
  return response.json();
}

/**
 * Fetches a specific product by its ID
 * @param {number} id - The unique identifier of the product to fetch
 * @returns {Promise<Product>} A promise that resolves to the product object
 * @throws {Error} When the API request fails or product is not found
 */
export async function fetchProductById(id: number): Promise<Product> {
  const response = await fetch(`${API_URL}/products/${id}`);
  return response.json();
}

/**
 * Fetches all available product categories from the API
 * @returns {Promise<string[]>} A promise that resolves to an array of category names
 * @throws {Error} When the API request fails
 */
export async function fetchCategories(): Promise<string[]> {
  const response = await fetch(`${API_URL}/products/categories`);
  return response.json();
}
