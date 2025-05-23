import { Pressable, StyleSheet, Text } from "react-native";

export const CategoryItem = ({
  category,
  isSelected,
  onPress,
}: {
  category: string;
  isSelected: boolean;
  onPress: () => void;
}) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        isSelected && styles.selected,
        { opacity: pressed ? 0.5 : 1 },
      ]}
      onPress={onPress}
    >
      <Text style={[styles.text, isSelected && styles.selectedText]}>
        {category}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    borderRadius: 16,
    backgroundColor: "#f0f0f0",
    marginHorizontal: 4,
  },
  selected: {
    backgroundColor: "#000",
    color: "#fff",
  },
  text: {
    color: "#000",
  },
  selectedText: {
    color: "#fff",
  },
});
