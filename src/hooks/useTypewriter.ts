import { useEffect, useState } from "react";

/** Reveals `text` one character at a time. Returns the part typed so far. */
export function useTypewriter(text: string, msPerChar = 100): string {
  const [length, setLength] = useState(0);

  useEffect(() => {
    let typed = 0;
    setLength(0);
    const interval = setInterval(() => {
      typed += 1;
      setLength(typed);
      if (typed >= text.length) clearInterval(interval);
    }, msPerChar);

    return () => clearInterval(interval);
  }, [text, msPerChar]);

  return text.slice(0, length);
}
