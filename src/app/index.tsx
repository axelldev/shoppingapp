import ProductCard from "@/components/product/ProductCard";
import { useProducts } from "@/hooks/useProducts";
import { FlashList } from "@shopify/flash-list";
import { StyleSheet, View } from "react-native";

export default function Index() {
  const { products, refetch, isRefetching } = useProducts();

  return (
    <View style={styles.container}>
      <FlashList
        data={products}
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
});
