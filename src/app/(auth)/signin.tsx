import { Alert, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import Button from "@/components/Button";
import { Link, Stack, useRouter } from "expo-router";
import Colors from "@/constants/Colors";
import { supabase } from "@/lib/supabase";

const SignIN = () => {
  const [email, setemail] = useState<string | "">("");
  const [password, setpassword] = useState<string | "">("");
  const [error, seterror] = useState<string | null>("");
  const [loding, setLoding] = useState(false);
  const router = useRouter();
  function resetFields() {
    setemail("");
    setpassword("");
  }
  //validate
  function validate() {
    seterror("");
    if (!email) {
      seterror("Email required!");
      return false;
    }
    if (!password) {
      seterror("Password required!");
      return false;
    }
    return true;
  }
  //sign succes

  async function doneSIgnIn() {
    if (!validate()) {
      return;
    }
    setLoding(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) Alert.alert(error.message);
    setLoding(false);
    resetFields();
    router.push("/");
  }
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Sign in",
          headerTitleAlign: "center",
        }}
      />
      <Text style={styles.title}>Email</Text>
      <TextInput
        value={email}
        onChangeText={setemail}
        style={styles.input}
        placeholder="you@gamil.com"
      />
      <Text style={styles.title}>Password</Text>
      <TextInput
        value={password}
        onChangeText={setpassword}
        style={styles.input}
        placeholder="Password"
        secureTextEntry
      />
      <Text style={{ color: "red" }}>{error}</Text>
      <Button disabled={loding} text={"Sign in"} onPress={doneSIgnIn} />
      <Link
        href={"./signup"}
        style={{
          alignSelf: "center",
          color: Colors.light.tint,
          fontSize: 18,
          fontWeight: "bold",
        }}
      >
        create an account
      </Link>
    </View>
  );
};

export default SignIN;

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
    marginTop: 10,
    marginBottom: 10,
  },
  image: {
    width: "60%",
    aspectRatio: 1,
    marginHorizontal: "auto",
  },
});
