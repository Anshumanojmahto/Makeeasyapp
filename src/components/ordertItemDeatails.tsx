import { View, Text, StyleSheet, Image } from "react-native";
import React, { useState } from "react";

import { Tables } from "../types";
import Colors from "@/constants/Colors";
import { defaultUri } from "./ProductItem";
import RemoteImage from "./RemoteImage";

type CartListItemProps = {
  orderItem: { products: Tables<"products"> | null } & Tables<"order_item">;
};

const OrderItemDetails = ({ orderItem }: CartListItemProps) => {
  return (
    <View style={styles.container}>
      <RemoteImage
        path={orderItem.products?.image}
        fallback={defaultUri}
        style={styles.image}
        resizeMode="contain"
      />
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{orderItem.products?.name}</Text>
        <View style={styles.subtitleContainer}>
          <Text style={styles.price}>
            ₹
            {orderItem.size == "F"
              ? (orderItem.products?.price ?? 0).toFixed(2)
              : ((orderItem.products?.price ?? 0) / 2 + 20).toFixed(2)}
          </Text>
          <Text>Size: {orderItem.size}</Text>
        </View>
      </View>
      <View style={styles.quantitySelector}>
        <Text style={styles.quantity}>{orderItem.quantity}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 5,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 75,
    aspectRatio: 1,
    alignSelf: "center",
    marginRight: 10,
    borderRadius: 10,
  },
  title: {
    fontWeight: "500",
    fontSize: 16,
    marginBottom: 5,
  },
  subtitleContainer: {
    flexDirection: "row",
    gap: 5,
  },
  quantitySelector: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    marginVertical: 10,
  },
  quantity: {
    fontWeight: "500",
    fontSize: 18,
  },
  price: {
    color: Colors.light.tint,
    fontWeight: "bold",
  },
});

export default OrderItemDetails;
