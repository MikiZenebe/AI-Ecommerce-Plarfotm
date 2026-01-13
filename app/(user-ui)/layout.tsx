import Header from "@/components/app/Header";
import { Toaster } from "@/components/ui/sonner";
import { CartStoreProvider } from "@/lib/store/cart-store-provider";
import { ChatStoreProvider } from "@/lib/store/chat-store-provider";
import { ClerkProvider } from "@clerk/nextjs";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <CartStoreProvider>
        <ChatStoreProvider>
          <Toaster />
          <Header />
          <main>{children}</main>
        </ChatStoreProvider>
      </CartStoreProvider>
    </ClerkProvider>
  );
}
