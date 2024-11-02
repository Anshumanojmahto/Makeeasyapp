import { StyleSheet, View, FlatList } from "react-native";
import products from "@assets/data/products";
import ProductItem from "@components/ProductItem";

export default function TabOneScreen() {
  return (
    /* <View>
        <ProductItem product={products[5]} />
        <ProductItem product={products[1]} />
      </View> */
    <FlatList
      data={products}
      renderItem={({ item }) => <ProductItem product={item} />}
      numColumns={2}
      contentContainerStyle={{ gap: 10, padding: 10 }}
      columnWrapperStyle={{ gap: 10 }}
    />
  );
}

const styles = StyleSheet.create({});
