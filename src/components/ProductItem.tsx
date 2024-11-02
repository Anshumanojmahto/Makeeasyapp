import { StyleSheet, Text, View, Image } from "react-native";
import Colors from "@/src/constants/Colors";

const ProductItem = ({ product }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.price}>₹ {product.price}</Text>
    </View>
  );
};

export default ProductItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 20,
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
