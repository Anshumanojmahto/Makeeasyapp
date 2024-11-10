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
  const [email, setEmail] = useState<string>("");
  const router = useRouter();
  const colorScheme = useColorScheme();
  useEffect(() => {
    (async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user?.email) {
        setEmail(user?.email);
      }
    })();
  }, []);

  const handleSignOut = async () => {
    try {
      setIsSigningOut(true);
      await supabase.auth.signOut();
      router.push("/(auth)/signin"); // Replace with the correct route name
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
        Email : {email}
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
