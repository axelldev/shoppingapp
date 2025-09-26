import CategoryItem from "@/components/product/CategoryItem";
import ProductCard from "@/components/product/ProductCard";
import { useCategories } from "@/hooks/useCategories";
import { useProducts } from "@/hooks/useProducts";
import { Colors } from "@/theme/colors";
import { FlashList } from "@shopify/flash-list";
import { useMemo, useState } from "react";
import { ScrollView, StyleSheet, TextInput, View } from "react-native";

export default function Index() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setCategory] = useState("all");

  const { products, refetch, isRefetching } = useProducts();
  const { categories } = useCategories();

  const allCategories = useMemo(() => ["all", ...categories], [categories]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        searchQuery === "" ||
        product.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [selectedCategory, products, searchQuery]);

  return (
    <View style={styles.container}>
      <View style={styles.filtersContainer}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search products..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            clearButtonMode="while-editing"
          />
        </View>
        <View style={styles.categories}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {allCategories.map((category) => (
              <CategoryItem
                key={category}
                category={category}
                isSelected={category === selectedCategory}
                onPress={() => setCategory(category)}
              />
            ))}
          </ScrollView>
        </View>
      </View>
      <FlashList
        data={filteredProducts}
        renderItem={({ item }) => <ProductCard product={item} />}
        numColumns={2}
        contentContainerStyle={{ padding: 8 }}
        onRefresh={refetch}
        refreshing={isRefetching}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  searchContainer: {
    paddingHorizontal: 8,
    paddingTop: 8,
    paddingBottom: 4,
  },
  filtersContainer: {
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  searchInput: {
    height: 40,
    borderColor: Colors.primary,
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
    fontSize: 16,
  },
  categories: {
    marginTop: 4,
    marginBottom: 8,
  },
});
