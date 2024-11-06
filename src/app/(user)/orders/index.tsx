import { ActivityIndicator, FlatList, StyleSheet, Text } from "react-native";
import OrderItemList from "@/components/OrderItemList";
import { useMyOrdersList } from "@/app/api/orders";

export default function Orders() {
  const { data: orders, isLoading, error } = useMyOrdersList();
  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return <Text>Failed to fetch products</Text>;
  }
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
