import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import React, { useState } from "react";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import products from "@assets/data/products";
import { defaultUri } from "@/components/ProductItem";
import Button from "@/components/Button";
import { useCart } from "@/providers/cartContext";
import { PizzaSize } from "@/types";

const sizes: PizzaSize[] = ["S", "M", "L", "XL"];

const ProductDetail = () => {
  const { addItem } = useCart();
  const { id } = useLocalSearchParams();
  const [selectedSize, setSelectedSize] = useState<PizzaSize>("M");
  const product = products.find((product) => product.id.toString() === id);

  const router = useRouter();
  const addToCart = () => {
    if (!product) {
      return;
    }
    addItem(product, selectedSize || "M");
    router.push("/");
  };
  if (!product) {
    return <Text>NO PRODUCT FOUND</Text>;
  }
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{ title: product.name, headerTitleAlign: "center" }}
      />
      <Image
        source={{ uri: product.image || defaultUri }}
        style={styles.image}
      />
      <Text style={styles.subTag}>{product.name}</Text>

      <Text style={styles.price}>Price : {product.price}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "white",
    flex: 1,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
    alignSelf: "center",
  },
  subTag: {
    marginVertical: 4,
    fontWeight: "bold",
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
  },
  sizes: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  size: {
    width: 50,
    aspectRatio: 1,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  sizeText: {
    fontSize: 20,
    fontWeight: "500",
    color: "black",
  },
});

export default ProductDetail;
