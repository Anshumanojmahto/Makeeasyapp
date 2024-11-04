import { StyleSheet, Text, TextInput, View, Image, Alert } from "react-native";
import React, { useState } from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import Button from "@/components/Button";
import { defaultUri } from "@/components/ProductItem";
import Colors from "@/constants/Colors";
import * as ImagePicker from "expo-image-picker";
import products from "@assets/data/products";

const CreateProduct = () => {
  const { id } = useLocalSearchParams();
  const isUpdating = !!id;
  const product = products.find((product) => product.id.toString() === id);
  const [name, setName] = useState<string | "">(product?.name || "");
  const [price, setPrice] = useState<string | "">(
    product?.price.toString() || ""
  );
  const [error, seterror] = useState<string | null>("");
  const [image, setImage] = useState<string | null>(
    product?.image || defaultUri
  );

  function resetFields() {
    setName("");
    setPrice("");
    setImage(defaultUri);
  }
  //validate
  function validate() {
    seterror("");
    if (!name) {
      seterror("Name required!");
      return false;
    }
    if (!price) {
      seterror("Price required!");
      return false;
    }
    if (isNaN(parseFloat(price))) {
      seterror("price is not a number!");
      return false;
    }
    return true;
  }

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  function onUpdate() {
    if (!validate()) {
      return;
    }

    //update on database

    console.log(name, price, image);
    const newproducts = products.map((product) =>
      product.id.toString() == id ? { ...product, name, price, image } : product
    );

    console.warn("product upDated");
    resetFields();
  }
  function clearImg() {
    setImage(defaultUri);
  }
  function onCreate() {
    if (!validate()) {
      return;
    }
    //create database

    console.warn("product created");

    resetFields();
  }
  function deleting() {
    console.warn("deleted!!!");
  }
  function confirmDelete() {
    Alert.alert("Confirm", "Are you sure you want to delete this product", [
      {
        text: "Cancle",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: deleting,
      },
    ]);
  }
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: isUpdating ? "Upadate Product" : "Create Product",
          headerTitleAlign: "center",
        }}
      />
      <Image source={{ uri: image || defaultUri }} style={styles.image} />
      <Text
        onPress={pickImage}
        style={{
          alignSelf: "center",
          fontWeight: "bold",
          color: Colors.light.tint,
          marginVertical: 8,
        }}
      >
        Select Image
      </Text>
      <Text
        onPress={clearImg}
        style={{
          alignSelf: "center",
          fontWeight: "bold",
          color: Colors.light.tint,
          marginVertical: 8,
        }}
      >
        Clear Image
      </Text>
      <Text style={styles.title}>Name</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        style={styles.input}
        placeholder="Name"
      />
      <Text style={styles.title}>Price(₹)</Text>
      <TextInput
        value={price}
        onChangeText={setPrice}
        style={styles.input}
        placeholder="Price"
        keyboardType="numeric"
      />
      <Text style={{ color: "red" }}>{error}</Text>
      <Button
        text={isUpdating ? "Update" : "Create"}
        onPress={isUpdating ? onUpdate : onCreate}
      />
      {isUpdating && (
        <Text
          onPress={confirmDelete}
          style={{
            alignSelf: "center",
            color: Colors.light.tint,
            fontSize: 18,
            fontWeight: "bold",
          }}
        >
          Delete
        </Text>
      )}
    </View>
  );
};

export default CreateProduct;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 7,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
  },
  input: {
    backgroundColor: "white",
    padding: 4,
    borderRadius: 8,
    marginTop: 5,
    marginBottom: 5,
  },
  image: {
    width: "60%",
    aspectRatio: 1,
    marginHorizontal: "auto",
  },
});
