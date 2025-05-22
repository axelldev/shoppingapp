import { getCategories, getProducts } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";
import { FlatList, Text, View } from "react-native";

export default function Index() {
  const { data: products = [], isLoading: isProductsLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const { data: categories = [], isLoading: isCategoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const allCategories = ["all", ...categories];

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <FlatList
        data={products}
        renderItem={({ item }) => <Text>{item.title}</Text>}
      />
    </View>
  );
}
