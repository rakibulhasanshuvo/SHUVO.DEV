"use client";

import React, { useState, useEffect } from "react";
import { m } from "framer-motion";

const words = ["Digital Luxury", "High Performance", "Unique Experiences"];

export default function AutotypingText() {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [speed, setSpeed] = useState(150);

  useEffect(() => {
    const handleTyping = () => {
      const currentWord = words[wordIndex];
      if (isDeleting) {
        setText(currentWord.substring(0, text.length - 1));
        setSpeed(60);
      } else {
        setText(currentWord.substring(0, text.length + 1));
        setSpeed(120);
      }

      if (!isDeleting && text === currentWord) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
      }
    };

    const timer = setTimeout(handleTyping, speed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, wordIndex, speed]);

  return (
    <span className="inline-flex items-center">
      <span className="text-white font-mono font-bold tracking-wide drop-shadow-[0_0_15px_rgba(255,255,255,0.2)] bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
        {text}
      </span>
      <m.span
        animate={{ opacity: [1, 1, 0, 0, 1] }}
        transition={{ duration: 0.8, repeat: Infinity, times: [0, 0.49, 0.5, 0.99, 1], ease: "linear" }}
        className="ml-1.5 inline-block w-2.5 h-[1.1em] bg-neon-cyan rounded-sm shadow-[0_0_10px_#00F0FF,0_0_20px_#00F0FF]"
        style={{ verticalAlign: "middle" }}
      />
    </span>
  );
}
