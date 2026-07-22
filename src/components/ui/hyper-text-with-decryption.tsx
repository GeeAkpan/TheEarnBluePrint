"use client";
import { cn } from "@/lib/utils";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- Configuration ---
const SCRAMBLE_SPEED = 10; // Faster for a snappier feel
const CYCLES_PER_LETTER = 3; // More cycles for a "computational" look
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+"; // Uppercase + Symbols looks cleaner

interface HyperTextProps {
  text: string;
  className?: string;
  highlightWords?: string[];
}

interface WordProps {
  children: string;
  isDimmed: boolean; // True when another word is hovered
  isHighlightable: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}

const Word = ({
  children,
  isDimmed,
  isHighlightable,
  onHoverStart,
  onHoverEnd,
}: WordProps) => {
  const [displayText, setDisplayText] = useState(children);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const scramble = useCallback(() => {
    let pos = 0;
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      const scrambled = children
        .split("")
        .map((char, index) => {
          if (pos / CYCLES_PER_LETTER > index) return char;
          const randomChar = CHARS[Math.floor(Math.random() * CHARS.length)];
          return randomChar;
        })
        .join("");

      setDisplayText(scrambled);
      pos++;

      if (pos >= children.length * CYCLES_PER_LETTER) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplayText(children);
      }
    }, SCRAMBLE_SPEED);
  }, [children]);

  const stopScramble = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setDisplayText(children);
  }, [children]);

  const handleMouseEnter = () => {
    if (isHighlightable) {
      setIsHovered(true);
      onHoverStart();
      scramble();
    }
  };

  const handleMouseLeave = () => {
    if (isHighlightable) {
      setIsHovered(false);
      onHoverEnd();
      stopScramble();
    }
  };

  return (
    <motion.span
      className={`
        relative inline-block whitespace-nowrap
        ${isHighlightable ? "cursor-pointer" : "cursor-default"}
      `}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      animate={{
        // Simple and clean visual logic:
        // 1. Keep layout stable (no scale/translate shifts)
        // 2. Dim other words slightly when one is hovered
        opacity: isDimmed && !isHovered ? 0.5 : 1,
        color: isHighlightable ? "var(--accent-color)" : undefined,
        zIndex: isHovered ? 20 : 1,
      }}
      transition={{ duration: 0.2 }}
    >
      {/* The Text Content */}
      <span className="relative z-10">{displayText}</span>
    </motion.span>
  );
};

export default function HyperTextParagraph({
  text,
  className = "",
  highlightWords = [],
}: HyperTextProps) {
  const [isParagraphHovered, setIsParagraphHovered] = useState(false);

  const words = text.split(" ");

  const clean = (w: string) => w.toLowerCase().replace(/[^a-z0-9]/g, "");

  return (
    <div className={`leading-relaxed tracking-wide ${className}`}>
      {words.map((word, i) => {
        const isHighlightable = highlightWords.some(
          (hw) => clean(hw) === clean(word)
        );

        return (
          <React.Fragment key={i}>
            <Word
              isDimmed={isParagraphHovered}
              isHighlightable={isHighlightable}
              onHoverStart={() => setIsParagraphHovered(true)}
              onHoverEnd={() => setIsParagraphHovered(false)}
            >
              {word}
            </Word>
            <span className="inline-block whitespace-pre"> </span>
          </React.Fragment>
        );
      })}
    </div>
  );
}
