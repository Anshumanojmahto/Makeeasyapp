import { StyleSheet, View } from "react-native";
import products from "@assets/data/products";
import ProductItem from "@components/ProductItem";

export default function TabOneScreen() {
  return (
    <>
      <View>
        <ProductItem product={products[5]} />
        <ProductItem product={products[1]} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({});
