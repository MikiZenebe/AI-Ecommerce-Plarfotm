import { CartStoreProvider } from "@/lib/store/cart-store-provider";
import { ClerkProvider } from "@clerk/nextjs";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <CartStoreProvider>
        <main>{children}</main>
      </CartStoreProvider>
    </ClerkProvider>
  );
}
