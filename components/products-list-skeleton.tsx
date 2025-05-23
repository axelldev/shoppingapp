import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, View } from "react-native";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";

const SkeletonPlaceholder = createShimmerPlaceholder(LinearGradient);

const ProductItemSkeleton = () => {
  return (
    <View style={productItemSkeletonStyles.container}>
      <SkeletonPlaceholder style={productItemSkeletonStyles.image} />
      <SkeletonPlaceholder style={productItemSkeletonStyles.title} />
      <SkeletonPlaceholder style={productItemSkeletonStyles.price} />
    </View>
  );
};

const productItemSkeletonStyles = StyleSheet.create({
  container: {
    width: "48%",
    padding: 8,
    backgroundColor: "#fff",
    justifyContent: "center",
    gap: 8,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 10,
  },
  title: {
    width: "80%",
    height: 16,
    borderRadius: 8,
  },
  price: {
    width: "60%",
    height: 16,
    borderRadius: 8,
  },
});

export const ProductsListSkeleton = () => {
  return (
    <View style={styles.container}>
      {Array.from({ length: 6 }).map((_, index) => (
        <ProductItemSkeleton key={index} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 16,
    padding: 8,
  },
});
