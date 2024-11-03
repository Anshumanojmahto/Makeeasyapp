import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet } from "react-native";
import { Stack } from "expo-router";
import { Text, View } from "react-native";
import { useCart } from "@/providers/cartContext";

export default function Cart() {
  const { items } = useCart();

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Cart", headerTitleAlign: "center" }} />
      <Text>items.length</Text>

      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});
