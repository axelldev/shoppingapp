import { useProducts } from "@/hooks/useProducts";
import { Text, View } from "react-native";

export default function Index() {
  const { products } = useProducts();

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text>Products: {products.length}</Text>
    </View>
  );
}
