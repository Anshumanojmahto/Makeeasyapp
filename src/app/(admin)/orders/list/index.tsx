import { ActivityIndicator, FlatList, StyleSheet, Text } from "react-native";
import orders from "@assets/data/orders";
import OrderItemList from "@/components/OrderItemList";
import { useAdminOrders } from "@/app/api/orders";

export default function Orders() {
  const {
    data: orders,
    isLoading,
    error,
  } = useAdminOrders({ archived: false });
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
