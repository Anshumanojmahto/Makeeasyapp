import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet, FlatList } from "react-native";
import { Stack } from "expo-router";
import { Text } from "react-native";
import { useCart } from "@/providers/cartContext";
import CartListItem from "@/components/CartListItem";
import Colors from "@/constants/Colors";
import Button from "@/components/Button";

export default function Cart() {
  const { items, total, checkOut } = useCart();

  return (
    <>
      <Stack.Screen options={{ title: "Cart", headerTitleAlign: "center" }} />
      <FlatList
        data={items}
        renderItem={({ item }) => <CartListItem cartItem={item} />}
        contentContainerStyle={{ padding: 8, gap: 8 }}
      />
      <Text style={styles.price}>Total : ₹ {total.toFixed(2)} </Text>
      <Button text="Checkout" onPress={checkOut} />

      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </>
  );
}

const styles = StyleSheet.create({
  price: {
    padding: 8,
    fontSize: 20,
    fontWeight: "700",
    color: Colors.light.tint,
  },
});
