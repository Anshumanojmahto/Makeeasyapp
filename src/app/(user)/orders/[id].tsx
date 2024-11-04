import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import OrderItemDetails from "@/components/ordertItemDeatails";
import OrderItemList from "@/components/OrderItemList";
import orders from "@assets/data/orders";
import { Stack, useLocalSearchParams } from "expo-router";

const OrderDetails = () => {
  const { id } = useLocalSearchParams();
  const order = orders.find((order) => order.id.toString() === id);
  if (!order) {
    return <Text>Order Not Found</Text>;
  }
  return (
    <View style={{ gap: 20, padding: 8 }}>
      <Stack.Screen
        options={{ title: `Order #${order.id}`, headerTitleAlign: "center" }}
      />
      <OrderItemList order={order} />
      <FlatList
        data={order.order_items}
        renderItem={({ item }) => <OrderItemDetails orderItem={item} />}
        contentContainerStyle={{
          gap: 5,
          padding: 5,
        }}
      />
    </View>
  );
};

export default OrderDetails;

const styles = StyleSheet.create({});
