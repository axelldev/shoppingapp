import { fetchProducts } from "@/data/products/products";
import { Product } from "@/types/products";
import { useQuery } from "@tanstack/react-query";

export interface UseProductsReturn {
  products: Product[];
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  isSuccess: boolean;
  refetch: () => void;
}

/**
 * Custom hook for fetching products using React Query
 * @returns {UseProductsReturn} Object containing products data and query states
 *
 * @example
 * ```tsx
 * const { products, isLoading, error, refetch } = useProducts();
 *
 * if (isLoading) return <LoadingSpinner />;
 * if (error) return <ErrorMessage error={error} onRetry={refetch} />;
 */
export const useProducts = (): UseProductsReturn => {
  const {
    data: products = [],
    isLoading,
    isError,
    isSuccess,
    error,
    refetch,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  return {
    products,
    isLoading,
    error,
    isError,
    isSuccess,
    refetch,
  };
};
