import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  useColorScheme,
} from "react-native";
import React from "react";
import { Link, Stack, useLocalSearchParams } from "expo-router";
import { defaultUri } from "@/components/ProductItem";
import Colors from "@/constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { useProduct } from "@/app/api/products";
import RemoteImage from "@/components/RemoteImage";

const ProductDetail = () => {
  const { id } = useLocalSearchParams();
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";

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
    <View style={[styles.container, isDarkMode && styles.darkContainer]}>
      <Stack.Screen
        options={{
          headerTitle: () => (
            <Text
              style={[styles.headerTitle, isDarkMode && styles.darkHeaderTitle]}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {product.name}
            </Text>
          ),
          headerRight: () => (
            <Link href={`/(admin)/menu/createProduct?id=${id}`} asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="pencil"
                    size={25}
                    color={isDarkMode ? Colors.dark.tint : Colors.light.tint}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <RemoteImage
        path={product.image}
        fallback={defaultUri}
        style={styles.image}
      />
      <Text style={[styles.subTag, isDarkMode && styles.darkSubTag]}>
        {product.name}
      </Text>

      <Text style={[styles.price, isDarkMode && styles.darkPrice]}>
        Price : {product.price}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    backgroundColor: "white",
  },
  darkContainer: {
    backgroundColor: "#121212",
  },
  image: {
    width: "100%",
    aspectRatio: 1,
    alignSelf: "center",
    borderRadius: 10,
  },
  subTag: {
    marginVertical: 4,
    fontWeight: "bold",
    textAlign: "center",
    paddingVertical: 10,
    fontSize: 25,
    color: "black",
  },
  darkSubTag: {
    color: "white",
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: Colors.light.tint,
  },
  darkPrice: {
    color: Colors.light.tint,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    overflow: "hidden",
    width: "80%",
    left: -50,
    color: "black",
  },
  darkHeaderTitle: {
    color: "white",
  },
});

export default ProductDetail;
