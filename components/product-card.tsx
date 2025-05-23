import { Product } from "@/types/products";
import { Colors } from "@/utils/colors";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  const router = useRouter();

  return (
    <Pressable onPress={() => router.push(`/products/${product.id}`)}>
      <View style={styles.container}>
        <Image source={{ uri: product.image }} style={styles.productImage} />
        <Text numberOfLines={2} style={styles.productTitle}>
          {product.title}
        </Text>
        <Text style={styles.productPrice}>${product.price}</Text>
      </View>
    </Pressable>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    margin: 8,
    justifyContent: "center",
    gap: 8,
    boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
    borderRadius: 16,
  },
  productImage: {
    width: "100%",
    height: 200,
    borderRadius: 16,
    objectFit: "contain",
  },
  productTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.primary,
  },
});
