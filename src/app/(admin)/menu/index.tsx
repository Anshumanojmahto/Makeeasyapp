import { StyleSheet, FlatList, Text, ActivityIndicator } from "react-native";
import ProductItem from "@components/ProductItem";
import { useProductDetails } from "@/app/api/products";

export default function TabOneScreen() {
  const { data: products, isLoading, error } = useProductDetails();
  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return <Text>Failed to fetch products</Text>;
  }

  return (
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
