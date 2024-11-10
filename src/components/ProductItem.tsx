import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import Colors from "@/constants/Colors";
import { Tables } from "../types";
import { Link } from "expo-router";
import RemoteImage from "./RemoteImage";

export type ProductItemProp = {
  product: Tables<"products">;
};
export const defaultUri =
  "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png";

const ProductItem = ({ product }: ProductItemProp) => {
  return (
    <Link href={`/menu/${product.id}`} asChild>
      <Pressable style={styles.container}>
        <RemoteImage
          path={product.image}
          fallback={defaultUri}
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
    borderRadius: 15,
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
