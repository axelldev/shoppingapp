import { fetchCategories } from "@/data/products/products";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

export interface UseCategoriesReturn {
  categories: string[];
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  isSuccess: boolean;
  refetch: () => void;
}

/**
 * Custom hook for fetching product categories using React Query
 *
 * @returns {UseCategoriesReturn} Object containing categories data and query states
 *
 * @example
 * ```tsx
 * const { categories, isLoading, error, refetch } = useCategories();
 *
 * if (isLoading) return <LoadingSpinner />;
 * if (error) return <ErrorMessage error={error} onRetry={refetch} />;
 *
 * return (
 *   <CategoryList categories={categories} />
 * );
 * ```
 */
export const useCategories = (): UseCategoriesReturn => {
  const {
    data: categories = [],
    isLoading,
    isError,
    error,
    isSuccess,
    refetch,
  }: UseQueryResult<string[], Error> = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    staleTime: 1000 * 60 * 5, // 5 minutes - categories don't change frequently
    gcTime: 1000 * 60 * 30, // 30 minutes (formerly cacheTime)
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    refetchOnWindowFocus: false, // Categories are relatively static
    refetchOnReconnect: true,
  });

  return {
    categories,
    isLoading,
    isError,
    error,
    isSuccess,
    refetch,
  };
};
