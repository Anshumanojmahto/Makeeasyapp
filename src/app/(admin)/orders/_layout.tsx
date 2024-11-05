import { Stack } from "expo-router";

const MenuLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="list"
        options={{ title: "Orders", headerTitleAlign: "center" }}
      />
    </Stack>
  );
};

export default MenuLayout;
