import { View, Text, StyleSheet, Pressable } from "react-native";
import React, { useState } from "react";
import { Tables } from "../types";
import { Link } from "expo-router";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

type CartListItemProps = {
  order: Tables<"orders">;
};
dayjs.extend(relativeTime);

const OrderItemList = ({ order }: CartListItemProps) => {
  // function calculateTime() {
  //   const currentTime = Date.now();
  //   const timeEle = currentTime - +order.created_at;
  //   const timeEles = timeEle / 1000;
  //   const timeElem = timeEles / 60;
  //   const timeEleh = timeElem / 60;
  //   settime(timeEleh);
  // }

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
    <Link href={`/orders/${order.id}`} asChild>
      <Pressable style={styles.container}>
        <View style={styles.container1}>
          <Text style={styles.orderTag}>Order #{order.id}</Text>
          <Text style={styles.orderTime}>
            {dayjs(order.created_at).fromNow()}
          </Text>
        </View>

        <Text style={styles.orderStatus}>{order.status}</Text>
      </Pressable>
    </Link>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    paddingHorizontal: 20,
  },
  container1: {
    alignItems: "center",
    justifyContent: "center",
  },
  orderTag: {
    fontSize: 16,
    fontWeight: "bold",
  },
  orderTime: {
    fontSize: 15,
    color: "gray",
  },
  orderStatus: {
    fontWeight: "bold",
  },
});

export default OrderItemList;
