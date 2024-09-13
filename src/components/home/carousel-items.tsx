import * as React from "react";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { Card, CardContent } from "../ui/card";
import Autoplay from "embla-carousel-autoplay";

export function CarouselPlugin() {
  const plugin = React.useRef(Autoplay({ delay: 3000, jump: false }));

  const images = [
    { src: "/assets/dunk-racer.webp", alt: "Dunk Racer" },
    { src: "/assets/dunk-panda.webp", alt: "Dunk Panda" },
  ];

  return (
    <Carousel
      plugins={[plugin.current]}
      opts={{ loop: true }}
      className="flex h-[80vh] "
    >
      <CarouselContent className="h-full w-full">
        {images.map((image, index) => (
          <CarouselItem key={index} className="w-[100vw] bg-black p-0">
            <CardContent className="flex h-full w-full items-center justify-center bg-red-400 p-0">
              <img src={image.src} className="h-full w-full " alt={image.alt} />
            </CardContent>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
