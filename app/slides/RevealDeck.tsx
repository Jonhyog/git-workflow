"use client";

import { useEffect, useRef } from "react";
import Reveal from "reveal.js";
import Markdown from "reveal.js/plugin/markdown/markdown.esm.js";
import RevealNotes from "reveal.js/plugin/notes/notes.esm.js";

export default function RevealDeck() {
  const deckDivRef = useRef<HTMLDivElement>(null);
  const deckRef = useRef<Reveal.Api | null>(null);

  useEffect(() => {
    if (deckRef.current || !deckDivRef.current) return;

    deckRef.current = new Reveal(deckDivRef.current, {
      plugins: [Markdown, RevealNotes],
      transition: "slide",
    });

    deckRef.current.initialize().then(() => {
      // Optional: event handlers and plugin setups
    });

    return () => {
      try {
        if (deckRef.current) {
          deckRef.current.destroy();
          deckRef.current = null;
        }
      } catch (e) {
        console.warn("Reveal.js destroy call failed.", e);
      }
    };
  }, []);

  return (
    <div className="reveal" ref={deckDivRef}>
      <div className="slides">
        <section
          data-markdown="/slides/sample.md"
          data-separator="^\r?\n---\r?\n$"
          data-separator-vertical="^\r?\n----\r?\n$"
          data-separator-notes="^Note:"
        />
      </div>
    </div>
  );
}
