import Colors from "@/constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { Link, Stack } from "expo-router";
import { Pressable } from "react-native";

const MenuLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: "Orders", headerTitleAlign: "center" }}
      />
    </Stack>
  );
};

export default MenuLayout;
