import { View, Text, StyleSheet, Image } from "react-native";
import React, { useState } from "react";

import { OrderItem } from "../types";
import Colors from "@/constants/Colors";
import { defaultUri } from "./ProductItem";

type CartListItemProps = {
  orderItem: OrderItem;
};

const OrderItemDetails = ({ orderItem }: CartListItemProps) => {
  //   const [time, settime] = useState(0);

  //   function calculateTime() {
  //     const currentTime = Date.now();
  //     const timeEle = currentTime - +order.created_at;
  //     const timeEles = timeEle / 1000;
  //     const timeElem = timeEles / 60;
  //     const timeEleh = timeElem / 60;
  //     settime(timeEleh);
  //   }

  return (
    // <Pressable style={styles.container}>
    //   <View style={styles.container1}>
    //     <Text style={styles.orderTag}>Order #{order.total}</Text>
    //     <Text style={styles.orderTime}>14 hours ago</Text>
    //   </View>
    //   <View>
    //     <Text style={styles.orderStatus}>status</Text>
    //   </View>
    // </Pressable>

    <View style={styles.container}>
      <Image
        source={{ uri: orderItem.products.image || defaultUri }}
        style={styles.image}
        resizeMode="contain"
      />
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{orderItem.products.name}</Text>
        <View style={styles.subtitleContainer}>
          <Text style={styles.price}>
            ₹{orderItem.products.price.toFixed(2)}
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
