import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  ChakraProvider,
  Flex,
  theme,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";

const requestNotificationPermission = async () => {
  if (!("Notification" in window)) {
    alert("Browser does not support notifications");
    return false;
  } else if (Notification.permission === "granted") {
    return true;
  } else if (Notification.permission !== "denied") {
    const permission = await Notification.requestPermission();
    return permission === "granted";
  }
  return false;
};

export const notifyUser = async (
  notificationText = "Thank you for enabling notifications"
) => {
  if (
    Notification.permission === "granted" &&
    "serviceWorker" in navigator &&
    navigator.serviceWorker.ready
  ) {
    const registration = await navigator.serviceWorker.ready;
    registration.showNotification("Oxygenkart", {
      body: notificationText,
      icon: "/favicon.ico", // Path to your favicon
      badge: "/favicon.ico",
    });
  }
};

function Chck() {
  const [userResponded, setUserResponded] = useState(false);

  const enableNotifsAndClose = async () => {
    const permissionGranted = await requestNotificationPermission();
    if (permissionGranted) {
      notifyUser();
      setUserResponded(true);
    }
  };

  const disableNotifsAndClose = () => {
    setUserResponded(true);
  };

  const showNotification = () => {
    notifyUser("Thanks for allowing");
  };

  useEffect(() => {
    // Register service worker
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then(() => console.log("Service Worker registered"))
        .catch((error) =>
          console.error("Service Worker registration failed:", error)
        );
    }
  }, []);

  return (
    <ChakraProvider theme={theme}>
      {!userResponded && Notification.permission !== "granted" ? (
        <Alert
          status="success"
          key="notification-prompt"
          style={{ position: "absolute" }}
        >
          <Box style={{ margin: "auto", padding: "10px" }}>
            <Flex alignItems={"center"}>
              <AlertTitle>Notifications</AlertTitle>
              <AlertIcon />
            </Flex>

            <AlertDescription>
              Would you like to enable notifications?
            </AlertDescription>
            <Button
              colorScheme="teal"
              size={"sm"}
              fontSize={"12px"}
              onClick={enableNotifsAndClose}
              ml={"10px"}
            >
              Sure!
            </Button>
            <Button
              colorScheme="gray"
              size={"sm"}
              fontSize={"12px"}
              onClick={disableNotifsAndClose}
              ml={"10px"}
            >
              No thanks!
            </Button>
          </Box>
        </Alert>
      ) : Notification.permission === "granted" ? (
        <Button
          key="show-notification"
          colorScheme="gray"
          size={"sm"}
          onClick={showNotification}
        >
          Click to show
        </Button>
      ) : (
        <h1 key="notifications-disabled">You have disabled notifications</h1>
      )}
    </ChakraProvider>
  );
}

export default Chck;
