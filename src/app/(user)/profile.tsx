import {
  StyleSheet,
  Button,
  View,
  ActivityIndicator,
  Text,
  useColorScheme,
} from "react-native";
import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "expo-router";

const Profile = () => {
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [phone, setPhone] = useState<string>("");
  const router = useRouter();
  const colorScheme = useColorScheme();

  useEffect(() => {
    // Fetch user data only on component mount
    const fetchUser = async () => {
      try {
        const { data, error } = await supabase.auth.getUser();
        console.log("error in profile", error);

        if (data?.user?.phone) {
          setPhone(data.user.phone);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, []); // Empty dependency array ensures this only runs once

  const handleSignOut = async () => {
    try {
      setIsSigningOut(true);
      await supabase.auth.signOut();
      router.replace("/(auth)/signin"); // Ensure this route exists
    } catch (error) {
      console.error("Error signing out:", error);
    } finally {
      setIsSigningOut(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 20,
          color: colorScheme === "dark" ? "white" : "black",
        }}
      >
        Phone: {phone}
      </Text>
      {isSigningOut ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Button onPress={handleSignOut} title="Sign out" />
      )}
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
