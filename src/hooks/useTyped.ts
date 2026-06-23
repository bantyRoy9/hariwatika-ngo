"use client";

import { useState, useEffect, useRef } from "react";

export function useTyped(
  phrases: string[],
  typingSpeed = 70,
  deletingSpeed = 40,
  pauseMs = 1800
) {
  const [displayed, setDisplayed] = useState("");
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [cursor, setCursor] = useState(true);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // blinking cursor
  useEffect(() => {
    const id = setInterval(() => setCursor((c) => !c), 530);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const current = phrases[phraseIdx];
    const speed = isDeleting ? deletingSpeed : typingSpeed;

    timeout.current = setTimeout(() => {
      if (!isDeleting) {
        setDisplayed(current.slice(0, displayed.length + 1));
        if (displayed.length + 1 === current.length) {
          timeout.current = setTimeout(() => setIsDeleting(true), pauseMs);
        }
      } else {
        setDisplayed(current.slice(0, displayed.length - 1));
        if (displayed.length - 1 === 0) {
          setIsDeleting(false);
          setPhraseIdx((i) => (i + 1) % phrases.length);
        }
      }
    }, speed);

    return () => { if (timeout.current) clearTimeout(timeout.current); };
  }, [displayed, isDeleting, phraseIdx, phrases, typingSpeed, deletingSpeed, pauseMs]);

  return { displayed, cursor };
}
