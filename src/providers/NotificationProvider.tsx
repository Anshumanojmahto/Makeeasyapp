import { PropsWithChildren, useEffect, useRef, useState } from "react";
import { registerForPushNotificationsAsync } from "@/lib/notifications";
import * as Notifications from "expo-notifications";
import { supabase } from "@/lib/supabase";
import { useAuth } from "./AuthProvider";
import { Tables } from "@/types";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const NotificationProvider = ({ children }: PropsWithChildren) => {
  const [expoPushToken, setExpoPushToken] = useState<string | undefined>();
  const { profile } = useAuth();

  const [notification, setNotification] =
    useState<Notifications.Notification>();
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();

  useEffect(() => {
    console.log("repeating in Notification provider");
    if (expoPushToken && profile && profile.expo_push_token !== expoPushToken) {
      savePushToken(expoPushToken);
    }
  }, [profile, expoPushToken]);

  const savePushToken = async (newToken: string) => {
    console.log(profile?.expo_push_token);

    if (!newToken || !profile || profile.expo_push_token === newToken) {
      return; // Exit early if nothing to update
    }
    try {
      const { data, error } = await supabase
        .from("profiles")
        .update({ expo_push_token: newToken })
        .eq("id", profile.id);

      if (error) {
        console.error("Error updating expo_push_token:", error.message);
      }
    } catch (err) {
      console.error("Unexpected error during update:", err);
    }
  };

  useEffect(() => {
    console.log("repeating in Notification provider 2");

    registerForPushNotificationsAsync().then((token) => {
      setExpoPushToken(token);
    });

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        // handle response if needed
      });

    // Cleanup listeners on unmount
    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
      }
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, []); // Empty array ensures this effect runs only once

  return <>{children}</>;
};

export default NotificationProvider;
