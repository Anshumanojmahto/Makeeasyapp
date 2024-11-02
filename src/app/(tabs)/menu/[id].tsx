import { View, Text } from "react-native";
import React from "react";
import { Stack, useLocalSearchParams } from "expo-router";

const ProductDetail = () => {
  const { id } = useLocalSearchParams();
  id;
  return (
    <View>
      <Stack.Screen
        options={{ title: "Details", headerTitleAlign: "center" }}
      />
      <Text>ProductDetail : {id}</Text>
    </View>
  );
};

export default ProductDetail;
