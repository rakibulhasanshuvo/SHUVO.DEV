"use client";

import React, { useState, useEffect } from "react";
import { m } from "framer-motion";

const words = ["Digital Luxury", "High Performance", "Unique Experiences"];

export default function AutotypingText() {
  const [text, setText] = useState("Digital Luxury");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    let timer: NodeJS.Timeout;
    const currentWord = words[wordIndex];

    const tick = () => {
      if (isDeleting) {
        setText((prev) => prev.substring(0, prev.length - 1));
      } else {
        setText((prev) => currentWord.substring(0, prev.length + 1));
      }
    };

    if (!isDeleting && text === currentWord) {
      timer = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && text === "") {
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % words.length);
    } else {
      const speed = isDeleting ? 60 : 120;
      timer = setTimeout(tick, speed);
    }

    return () => clearTimeout(timer);
  }, [text, isDeleting, wordIndex, isMounted]);

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
