import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  useColorScheme,
} from "react-native";
import React, { useState } from "react";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { defaultUri } from "@/components/ProductItem";
import Button from "@/components/Button";
import { useCart } from "@/providers/cartContext";
import { PizzaSize } from "@/types";
import { useProduct } from "@/app/api/products";
import RemoteImage from "@/components/RemoteImage";

const sizes: PizzaSize[] = ["H", "F"];

const ProductDetail = () => {
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState<PizzaSize>("F");
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const colorScheme = useColorScheme();

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
        options={{
          headerTitle: () => (
            <Text
              style={[
                styles.headerTitle,
                colorScheme === "dark" && styles.darkHeaderTitle,
              ]}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {product.name}
            </Text>
          ),
        }}
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

      <Text style={styles.price}>
        Price : {selectedSize == "F" ? product.price : product.price / 2 + 20}
      </Text>
      <Button onPress={addToCart} text="Add to cart" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    backgroundColor: "#fffbf0",
  },
  image: {
    width: "100%",
    aspectRatio: 1,
    alignSelf: "center",
    borderRadius: 15,
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
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    overflow: "hidden",
    width: "80%",
    textAlign: "left",
    left: -20,
  },
  darkHeaderTitle: {
    color: "white",
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
