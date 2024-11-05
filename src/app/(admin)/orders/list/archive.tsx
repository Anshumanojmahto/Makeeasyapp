import { FlatList, StyleSheet } from "react-native";
import orders from "@assets/data/orders";
import OrderItemList from "@/components/OrderItemList";

export default function Orders() {
  return (
    <FlatList
      data={orders}
      renderItem={({ item }) => <OrderItemList order={item} />}
      contentContainerStyle={{
        gap: 5,
        padding: 5,
      }}
    />
  );
}

const styles = StyleSheet.create({});
