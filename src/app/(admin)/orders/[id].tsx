import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import OrderItemDetails from "@/components/ordertItemDeatails";
import OrderItemList from "@/components/OrderItemList";
import orders from "@assets/data/orders";
import { Stack, useLocalSearchParams } from "expo-router";
import Colors from "@/constants/Colors";
import { OrderStatusList } from "@/types";

const OrderDetails = () => {
  const { id } = useLocalSearchParams();
  const order = orders.find((order) => order.id.toString() === id);
  if (!order) {
    return <Text>Order Not Found</Text>;
  }
  return (
    <View style={{ padding: 10, gap: 20 }}>
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
        ListFooterComponent={() => (
          <>
            <Text style={{ fontWeight: "bold" }}>Status</Text>
            <View style={{ flexDirection: "row", gap: 5 }}>
              {OrderStatusList.map((status) => (
                <Pressable
                  key={status}
                  onPress={() => console.warn("Update status")}
                  style={{
                    borderColor: Colors.light.tint,
                    borderWidth: 1,
                    padding: 10,
                    borderRadius: 5,
                    marginVertical: 10,
                    backgroundColor:
                      order.status === status
                        ? Colors.light.tint
                        : "transparent",
                  }}
                >
                  <Text
                    style={{
                      color:
                        order.status === status ? "white" : Colors.light.tint,
                    }}
                  >
                    {status}
                  </Text>
                </Pressable>
              ))}
            </View>
          </>
        )}
      />
    </View>
  );
};

export default OrderDetails;

const styles = StyleSheet.create({});
