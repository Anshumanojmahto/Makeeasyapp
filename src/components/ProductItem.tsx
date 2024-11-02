import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import Colors from "@/constants/Colors";
import { Product } from "../types";
import { Link } from "expo-router";

export type ProductItemProp = {
  product: Product;
};
export const defaultUri =
  "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png";

const ProductItem = ({ product }: ProductItemProp) => {
  return (
    <Link href={`/menu/${product.id}`} asChild>
      <Pressable style={styles.container}>
        <Image
          source={{ uri: product.image || defaultUri }}
          style={styles.image}
          resizeMode={"contain"}
        />
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.price}>₹ {product.price}</Text>
      </Pressable>
    </Link>
  );
};

export default ProductItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 20,
    flex: 1,
    maxWidth: "50%",
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 8,
  },
  price: {
    fontWeight: "bold",
    color: Colors.light.tint,
  },
});
