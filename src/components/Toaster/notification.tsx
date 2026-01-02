
import { SnackbarProvider } from "notistack";
import React from "react";

export default function NotificationProvider({ children }: { children: React.ReactNode }) {
  return (
    <SnackbarProvider
      maxSnack={1}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      autoHideDuration={3000}
    >
      {children}
    </SnackbarProvider>
  );
}
