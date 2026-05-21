"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";

interface LazyVideoPreviewProps {
  src: string;
  poster: string;
  className?: string;
}

export default function LazyVideoPreview({
  src,
  poster,
  className = ""
}: LazyVideoPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        rootMargin: "100px", // Pre-load slightly before entering viewport
        threshold: 0.1,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!videoRef.current) return;

    if (isInView) {
      videoRef.current.play().catch((err) => {
        // Auto-play might be blocked or cancelled gracefully
        console.log("Lazy play cancelled/blocked:", err.message);
      });
    } else {
      videoRef.current.pause();
    }
  }, [isInView]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full aspect-[16/10] overflow-hidden bg-[#0A0A0C] border border-white/10 rounded-xl ${className}`}
    >
      {/* Loading Placeholder / Poster Fallback */}
      {(!loaded || !isInView) && (
                <Image fill src={poster} alt="Preview Poster" className="absolute inset-0 w-full h-full object-cover z-10 transition-opacity duration-500" style={{ opacity: loaded && isInView ? 0 : 1 }} sizes="(max-width: 768px) 100vw, 50vw" />
      )}

      {/* Actual VP9 High-Efficiency WebM Loop */}
      {isInView && (
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          muted
          playsInline
          loop
          onLoadedData={() => setLoaded(true)}
          className="w-full h-full object-cover transition-opacity duration-500"
          style={{ opacity: loaded ? 1 : 0 }}
        />
      )}
    </div>
  );
}
