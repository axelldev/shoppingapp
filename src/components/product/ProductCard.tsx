import { Colors } from "@/theme/colors";
import { Product } from "@/types/products";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();

  return (
    <Pressable
      style={styles.container}
      onPress={() => router.push(`/product/${product.id}`)}
    >
      <Image style={styles.image} source={{ uri: product.image }} />
      <View style={styles.productInfo}>
        <Text numberOfLines={2} style={styles.title}>
          {product.title}
        </Text>
        <Text style={styles.price}>${product.price}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 8,
    gap: 8,
    padding: 12,
    borderRadius: 12,
    backgroundColor: "#fff",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 12,
  },
  productInfo: {
    gap: 4,
  },
  title: {
    fontSize: 14,
    fontWeight: "500",
  },
  price: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.primary,
  },
});
