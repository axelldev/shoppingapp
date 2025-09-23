import ProductCard from "@/components/product/ProductCard";
import { useCategories } from "@/hooks/useCategories";
import { useProducts } from "@/hooks/useProducts";
import { Colors } from "@/theme/colors";
import { FlashList } from "@shopify/flash-list";
import { useMemo, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

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
            <Pressable
              style={[
                styles.category,
                {
                  backgroundColor:
                    selectedCategory === category ? Colors.primary : "#f0f0f0",
                },
              ]}
              key={category}
              onPress={() => setCategory(category)}
            >
              <Text>{category}</Text>
            </Pressable>
          ))}
        </ScrollView>
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
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 4,
  },
  searchInput: {
    height: 40,
    borderColor: Colors.primary,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
    fontSize: 16,
  },
  categories: {
    marginTop: 4,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  category: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
    marginHorizontal: 8,
  },
});
