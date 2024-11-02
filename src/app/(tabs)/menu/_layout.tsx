import { Stack } from "expo-router";

const MenuLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: "Menu", headerTitleAlign: "center" }}
      />
    </Stack>
  );
};

export default MenuLayout;
