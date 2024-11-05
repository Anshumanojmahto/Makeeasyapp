import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Redirect, Stack } from "expo-router";
import { useAuth } from "@/providers/AuthProvider";

const Layout = () => {
  const { session, isAdmin } = useAuth();
  if (session) {
    return <Redirect href={"/"} />;
  }

  return <Stack />;
};

export default Layout;

const styles = StyleSheet.create({});
