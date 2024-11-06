import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { defaultUri } from "@/components/ProductItem";
import Button from "@/components/Button";
import { useCart } from "@/providers/cartContext";
import { PizzaSize } from "@/types";
import { useProduct } from "@/app/api/products";
import RemoteImage from "@/components/RemoteImage";

const sizes: PizzaSize[] = ["S", "M", "L", "XL"];

const ProductDetail = () => {
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState<PizzaSize>("M");
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const {
    data: product,
    isLoading,
    error,
  } = useProduct(parseInt(typeof id === "string" ? id : id[0]));

  const addToCart = () => {
    if (!product) {
      return;
    }
    addItem(product, selectedSize || "M");
    router.push("/cart");
  };
  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (error || !product) {
    return <Text>Failed to fetch product</Text>;
  }
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{ title: product.name, headerTitleAlign: "center" }}
      />
      <RemoteImage
        path={product.image}
        fallback={defaultUri}
        style={styles.image}
      />
      <Text style={styles.subTag}>Select size</Text>
      <View style={styles.sizes}>
        {sizes.map((size) => (
          <Pressable
            key={size}
            onPress={() => setSelectedSize(size)}
            style={[
              styles.size,
              {
                backgroundColor: size === selectedSize ? "gainsboro" : "white",
              },
            ]}
          >
            <Text
              style={[
                styles.sizeText,
                { color: size === selectedSize ? "black" : "gray" },
              ]}
            >
              {size}
            </Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.price}>Price : {product.price}</Text>
      <Button onPress={addToCart} text="Add to cart" />
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
    marginVertical: 10,
    fontWeight: "600",
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: "auto",
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
