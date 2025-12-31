"use client";

import React, { useCallback, useEffect, useState } from "react";
import type { FEATURED_PRODUCTS_QUERYResult } from "@/sanity.types";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "../ui/carousel";
import Image from "next/image";

type FeaturedProduct = FEATURED_PRODUCTS_QUERYResult[number];

interface FeaturedCarouselProps {
  products: FEATURED_PRODUCTS_QUERYResult;
}

export default function FeaturedCarousel({ products }: FeaturedCarouselProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const scrollTo = useCallback(
    (index: number) => {
      api?.scrollTo(index);
    },
    [api]
  );

  if (products.length === 0) {
    return null;
  }

  return (
    <div>
      <Carousel>
        <CarouselContent>
          {products.map((product) => (
            <CarouselItem key={product._id}>
              <FeaturedSlide product={product} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}

interface FeaturedSlideProps {
  product: FeaturedProduct;
}

function FeaturedSlide({ product }: FeaturedSlideProps) {
  const mainImage = product.images?.[0]?.asset?.url;

  return (
    <div>
      <div>
        {mainImage ? (
          <Image
            src={mainImage}
            alt={product.name ?? ""}
            fill
            className='object-cover'
            sizes='(max-width: 768px) 100vw, 60vw'
            priority
          />
        ) : (
          <div className='flex h-full items-center justify-center bg-zinc-800'>
            <span className='text-zinc-500'>No image</span>
          </div>
        )}
      </div>
    </div>
  );
}
