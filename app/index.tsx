import { CategoryItem } from "@/components/category-item";
import ProductCard from "@/components/product-card";
import { ProductsListSkeleton } from "@/components/products-list-skeleton";
import { SearchInput } from "@/components/search-input";
import { getCategories, getProducts } from "@/utils/api";
import { STALE_TIME } from "@/utils/time";
import { useHeaderHeight } from "@react-navigation/elements";
import { FlashList } from "@shopify/flash-list";
import { useQuery } from "@tanstack/react-query";
import { BlurView } from "expo-blur";
import { useMemo, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Index() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const headerHeight = useHeaderHeight();
  const insets = useSafeAreaInsets();

  const {
    data: products = [],
    isLoading: isProductsLoading,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    staleTime: STALE_TIME.ONE_DAY,
  });

  const allCategories = ["all", ...categories];

  const filteredProducts = useMemo(
    () =>
      products.filter((product) => {
        const search = product.title.toLowerCase();
        const category = product.category.toLowerCase();

        const matchesSearch = search.includes(searchQuery.toLowerCase());
        const matchesCategory =
          selectedCategory === "all" || category.includes(selectedCategory);

        return matchesSearch && matchesCategory;
      }),
    [products, selectedCategory, searchQuery]
  );

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <BlurView
        intensity={100}
        tint="light"
        style={[styles.filtersContainer, { paddingTop: headerHeight }]}
      >
        <SearchInput
          value={searchQuery}
          onChangeText={setSearchQuery}
          onClear={() => setSearchQuery("")}
        />
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {allCategories.map((category) => (
            <CategoryItem
              key={category}
              category={category}
              isSelected={selectedCategory === category}
              onPress={() => setSelectedCategory(category)}
            />
          ))}
        </ScrollView>
      </BlurView>
      {isProductsLoading || isRefetching ? (
        <View style={{ paddingTop: headerHeight + 100 }}>
          <ProductsListSkeleton />
        </View>
      ) : (
        <FlashList
          data={filteredProducts}
          contentContainerStyle={{
            ...styles.listContent,
            paddingTop: headerHeight + 100,
          }}
          estimatedItemSize={200}
          renderItem={({ item }) => <ProductCard product={item} />}
          numColumns={2}
          onRefresh={refetch}
          refreshing={isRefetching || isProductsLoading}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  filtersContainer: {
    gap: 8,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingVertical: 8,
    overflow: "hidden",
    zIndex: 2,
  },
  listContent: {
    padding: 16,
  },
});
