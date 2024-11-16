import { Alert, StyleSheet, Text, View, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import Button from "@/components/Button";
import { router, Stack } from "expo-router";
import Colors from "@/constants/Colors";
import { supabase } from "@/lib/supabase";
import { Input } from "react-native-elements";
import { useColorScheme } from "react-native"; // Import to detect theme

const SignIn = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const colorScheme = useColorScheme(); // Detect current color scheme (dark or light)

  function resetFields() {
    setPhoneNumber("");
    setOtp("");
  }

  // Validation function for input fields
  function validate() {
    setError(null);

    const phoneRegex = /^\+?[1-9]\d{1,14}$/; // Simple regex for phone numbers
    if (!phoneNumber || !phoneRegex.test(phoneNumber)) {
      setError("A valid phone number is required (e.g., +123456789).");
      return false;
    }

    return true;
  }

  // Send OTP function
  async function sendOtp() {
    if (!validate()) return;

    setLoading(true);
    const { data, error } = await supabase.auth.signInWithOtp({
      phone: phoneNumber,
    });

    if (error) {
      Alert.alert("phone no not valid !");
      setError(error.message);
    } else {
      Alert.alert("Success", "OTP sent to your phone number.");
    }
    setLoading(false);
  }

  // Verify OTP function
  async function verifyOtp() {
    if (!otp) {
      setError("OTP is required.");
      return;
    }

    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.verifyOtp({
      phone: phoneNumber,
      token: otp,
      type: "sms",
    });

    if (error) {
      Alert.alert("Error", error.message);
      setError(error.message);
    } else {
      Alert.alert("Success", "OTP verified successfully.");
      resetFields();
    }
    setLoading(false);
  }

  // Dynamic styles based on color scheme
  const titleStyle = {
    fontSize: 16,
    fontWeight: "bold" as "bold", // Explicitly cast to a valid type
    color: colorScheme === "dark" ? "white" : "black",
  };

  const inputStyle = {
    padding: 8,
    borderRadius: 8,
    marginVertical: 10,
    color: colorScheme === "dark" ? "white" : "black", // Text color for input
  };

  const iconColor = colorScheme === "dark" ? "#fff" : "#333"; // Icon color based on theme

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Log In",
          headerTitleAlign: "center",
        }}
      />

      <Text style={titleStyle}>Phone Number</Text>
      <Input
        value={phoneNumber}
        leftIcon={{
          type: "font-awesome",
          name: "phone",
          color: iconColor, // Dynamically change icon color based on theme
        }}
        onChangeText={setPhoneNumber}
        style={inputStyle}
        placeholder="+918684274837"
        placeholderTextColor={colorScheme === "dark" ? "#bbb" : "#777"} // Adjust placeholder color for theme
      />

      <Text style={titleStyle}>OTP</Text>
      <Input
        value={otp}
        leftIcon={{
          type: "font-awesome",
          name: "lock",
          color: iconColor, // Dynamically change icon color based on theme
        }}
        onChangeText={setOtp}
        style={inputStyle}
        placeholder="Enter OTP"
        placeholderTextColor={colorScheme === "dark" ? "#bbb" : "#777"} // Adjust placeholder color for theme
      />

      {error && <Text style={{ color: "red" }}>{error}</Text>}

      <Button disabled={loading} text={"Send OTP"} onPress={sendOtp} />

      <Button
        disabled={loading}
        text={loading ? "loading..." : "Verify OTP"}
        onPress={verifyOtp}
      />
      <Button text={"log in"} onPress={() => router.push("/(admin)")} />
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
});
