"use client";

import { Minus, Plus, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AddToCartButtonProps {
  productId: string;
  name: string;
  price: number;
  image?: string;
  stock: number;
  className?: string;
}

export function AddToCartButton({
  productId,
  name,
  price,
  image,
  stock,
  className,
}: AddToCartButtonProps) {
  const quantityInCart = 0;
  const isOutOfStock = stock <= 0;
  const isAtMax = quantityInCart >= stock;

  // Out of stock
  if (isOutOfStock) {
    return (
      <Button
        disabled
        variant='secondary'
        className={cn("h-11 w-full", className)}
      >
        Out of Stock
      </Button>
    );
  }

  // Not in cart - show Add to Basket button
  if (quantityInCart === 0) {
    return (
      <Button className={cn("h-11 w-full", className)}>
        <ShoppingBag className='mr-2 h-4 w-4' />
        Add to Basket
      </Button>
    );
  }

  // In cart - show quantity controls
  return (
    <div
      className={cn(
        "flex h-11 w-full items-center rounded-md border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-900",
        className
      )}
    >
      <Button
        variant='ghost'
        size='icon'
        className='h-full flex-1 rounded-r-none'
      >
        <Minus className='h-4 w-4' />
      </Button>
      <span className='flex-1 text-center text-sm font-semibold tabular-nums'>
        {quantityInCart}
      </span>
      <Button
        variant='ghost'
        size='icon'
        className='h-full flex-1 rounded-l-none disabled:opacity-20'
        disabled={isAtMax}
      >
        <Plus className='h-4 w-4' />
      </Button>
    </div>
  );
}
