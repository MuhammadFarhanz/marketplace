import React from "react";
import { CarouselPlugin } from "./carousel-items";

function Carousel() {
  return (
    <div className="h-[80vh]">
      <div className="h-full w-3/4 overflow-visible border-r-2 border-black bg-gray-200">
        <CarouselPlugin />
      </div>
    </div>
  );
}

export default Carousel;
