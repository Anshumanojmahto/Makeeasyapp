import React from "react";
import { withLayoutContext } from "expo-router";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const TopTab = withLayoutContext(createMaterialTopTabNavigator().Navigator);

const Layout = () => {
  return (
    <TopTab>
      <TopTab.Screen name="index" options={{ title: "Active" }} />
      <TopTab.Screen name="archive" options={{ title: "Archive" }} />
    </TopTab>
  );
};

export default Layout;
