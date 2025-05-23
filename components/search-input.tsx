import { Ionicons } from "@expo/vector-icons";
import {
  Keyboard,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface SearchInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onClear: () => void;
}

export const SearchInput = ({
  value,
  onChangeText,
  onClear,
}: SearchInputProps) => {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search for a product"
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        returnKeyType="search"
        onSubmitEditing={() => Keyboard.dismiss()}
        submitBehavior="blurAndSubmit"
      />
      <TouchableOpacity onPress={onClear}>
        <Ionicons name="close" size={24} color="#666" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  input: {
    flex: 1,
    padding: 8,
    fontSize: 18,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
  },
});
