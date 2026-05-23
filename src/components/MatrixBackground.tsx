"use client";

import React, { useEffect, useRef } from "react";

const MatrixBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let lastDrawTime = 0;
    const fps = 20; // 20 frames per second = ~50ms
    const interval = 1000 / fps;

    // Set canvas dimensions
    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      } else {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    // Initial resize
    resizeCanvas();

    // Matrix characters - katakana + latin + numbers
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン".split("");

    const fontSize = 16;
    let columns = Math.floor(canvas.width / fontSize);
    let drops: number[] = [];

    // Initialize drops
    const initDrops = () => {
      columns = Math.floor(canvas.width / fontSize);
      drops = [];
      for (let x = 0; x < columns; x++) {
        // Start drops off screen at random heights
        drops[x] = Math.random() * -100;
      }
    };

    initDrops();

    // Re-initialize drops and resize when window resizes
    const handleResize = () => {
      resizeCanvas();
      initDrops();
    };
    window.addEventListener("resize", handleResize);

    const draw = (timestamp: number) => {
      if (!lastDrawTime) lastDrawTime = timestamp;

      const deltaTime = timestamp - lastDrawTime;

      if (deltaTime > interval) {
        // Semi-transparent black background to create trail effect
        ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Create Cyber-Luxury gradient (Neon Cyan at top, Electric Purple at bottom)
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, "#00F0FF"); // Neon Cyan top
        gradient.addColorStop(1, "#A100FF"); // Electric Purple bottom

        ctx.fillStyle = gradient;
        ctx.font = `${fontSize}px monospace`;

        for (let i = 0; i < drops.length; i++) {
          const text = chars[Math.floor(Math.random() * chars.length)];

          ctx.fillText(text, i * fontSize, drops[i] * fontSize);

          // Reset drop to top if it has reached the bottom randomly
          if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
          }

          drops[i]++;
        }

        // Adjust lastDrawTime to maintain steady frame rate
        lastDrawTime = timestamp - (deltaTime % interval);
      }

      animationFrameId = requestAnimationFrame(draw);
    };

        let isObserving = false;

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        // Resume animation
        if (!isObserving) {
          isObserving = true;
          lastDrawTime = 0; // reset to avoid jump
          animationFrameId = requestAnimationFrame(draw);
        }
      } else {
        // Pause animation
        if (isObserving) {
          isObserving = false;
          if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
          }
        }
      }
    };

    const observer = new IntersectionObserver(handleIntersect, {
      threshold: 0,
    });

    if (canvas) {
      observer.observe(canvas);
    }

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      if (observer) {
        observer.disconnect();
      }
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 w-full h-full"
      style={{ display: "block", backgroundColor: "black" }}
    />
  );
};

export default MatrixBackground;
