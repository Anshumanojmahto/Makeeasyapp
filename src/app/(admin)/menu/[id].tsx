import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { Link, Stack, useLocalSearchParams } from "expo-router";
import { defaultUri } from "@/components/ProductItem";
import Colors from "@/constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { useProduct } from "@/app/api/products";

const ProductDetail = () => {
  const { id } = useLocalSearchParams();
  const {
    data: product,
    isLoading,
    error,
  } = useProduct(parseInt(typeof id === "string" ? id : id[0]));
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
          title: product.name,
          headerTitleAlign: "center",
          headerRight: () => (
            <Link href={`/(admin)/menu/createProduct?id=${id}`} asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="pencil"
                    size={25}
                    color={Colors.light.tint}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
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
