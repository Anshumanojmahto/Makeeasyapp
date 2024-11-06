import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import OrderItemDetails from "@/components/ordertItemDeatails";
import OrderItemList from "@/components/OrderItemList";
import { Stack, useLocalSearchParams } from "expo-router";
import { useOrder } from "@/app/api/orders";
import { useUpdateOrderSubscription } from "@/app/api/subsriptions";

const OrderDetails = () => {
  const { id } = useLocalSearchParams();
  useUpdateOrderSubscription(parseInt(typeof id === "string" ? id : id[0]));
  const {
    data: order,
    isLoading,
    error,
  } = useOrder(parseInt(typeof id === "string" ? id : id[0]));

  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (error || !order) {
    return <Text>Failed to fetch product</Text>;
  }

  return (
    <View style={{ gap: 20, padding: 8 }}>
      <Stack.Screen
        options={{ title: `Order #${order.id}`, headerTitleAlign: "center" }}
      />
      <OrderItemList order={order} />
      <FlatList
        data={order.order_item}
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
