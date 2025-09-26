import { Colors } from "@/theme/colors";
import { Pressable, StyleSheet, Text } from "react-native";

interface CategoryItemProps {
  category: string;
  isSelected: boolean;
  onPress: (category: string) => void;
}

export default function CategoryItem({
  category,
  isSelected,
  onPress,
}: CategoryItemProps) {
  return (
    <Pressable
      key={category}
      style={({ pressed }) => [
        styles.category,
        {
          opacity: pressed ? 0.6 : 1,
          backgroundColor: isSelected ? Colors.primary : "#f0f0f0",
        },
      ]}
      onPress={() => onPress(category)}
    >
      <Text>{category}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  category: {
    padding: 8,
    borderRadius: 16,
    backgroundColor: "#f0f0f0",
    marginHorizontal: 4,
  },
});
