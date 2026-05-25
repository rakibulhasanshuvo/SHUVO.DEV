"use client";

import dynamic from "next/dynamic";

const ThreeDCarousel = dynamic(() => import("./ThreeDCarousel"), {
  ssr: false,
  loading: () => <div className="w-full h-full min-h-[400px] bg-gradient-to-b from-neutral-950 to-black rounded-3xl" />
});

export default function DynamicThreeDCarouselClient() {
  return <ThreeDCarousel />;
}
