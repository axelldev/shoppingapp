import ProductCard from "@/components/product-card";
import { getCategories, getProducts } from "@/utils/api";
import { FlashList } from "@shopify/flash-list";
import { useQuery } from "@tanstack/react-query";
import { StyleSheet, View } from "react-native";

export default function Index() {
  const {
    data: products = [],
    isLoading: isProductsLoading,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const { data: categories = [], isLoading: isCategoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const allCategories = ["all", ...categories];

  return (
    <View style={styles.container}>
      <FlashList
        data={products}
        contentContainerStyle={{ padding: 16 }}
        estimatedItemSize={200}
        renderItem={({ item }) => <ProductCard product={item} />}
        numColumns={2}
        onRefresh={refetch}
        refreshing={isRefetching || isProductsLoading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
