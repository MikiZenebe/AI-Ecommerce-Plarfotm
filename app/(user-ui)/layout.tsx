import { ClerkProvider } from "@clerk/nextjs";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <main>{children}</main>
    </ClerkProvider>
  );
}
