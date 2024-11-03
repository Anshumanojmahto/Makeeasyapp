import { StyleSheet, Text, TextInput, View, Image } from "react-native";
import React, { useState } from "react";
import { Stack } from "expo-router";
import Button from "@/components/Button";
import { defaultUri } from "@/components/ProductItem";
import Colors from "@/constants/Colors";
import * as ImagePicker from "expo-image-picker";

const CreateProduct = () => {
  const [name, setName] = useState<string | "">("");
  const [price, setPrice] = useState<string | "">("");
  const [error, seterror] = useState<string | null>("");
  const [image, setImage] = useState<string | null>(defaultUri);

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

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
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
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{ title: "Create Product", headerTitleAlign: "center" }}
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
      <Button text="Create" onPress={onCreate} />
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
