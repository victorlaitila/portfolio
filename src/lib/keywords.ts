export interface TextChunk {
  text: string;
  isKeyword: boolean;
}

const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/**
 * Splits text into chunks, marking whole-word occurrences of any keyword.
 * Longer keywords win, so "Vue.js" is matched before "Vue".
 */
export function splitByKeywords(text: string, keywords: string[]): TextChunk[] {
  if (keywords.length === 0) return [{ text, isKeyword: false }];

  const alternatives = [...keywords].sort((a, b) => b.length - a.length).map(escapeRegExp).join("|");
  // The capture group makes split() keep the matches, at every odd index.
  const pattern = new RegExp(`(?<!\\w)(${alternatives})(?!\\w)`);

  return text
    .split(pattern)
    .map((chunk, index) => ({ text: chunk, isKeyword: index % 2 === 1 }))
    .filter((chunk) => chunk.text !== "");
}
