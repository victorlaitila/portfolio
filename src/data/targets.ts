/**
 * Target filtering for career.yaml entries, shared by the data layer and the e2e tests.
 * Kept free of Vite-specific imports so it also runs under Node.
 */

export type Target = "cv" | "portfolio";

/** An entry without `targets` appears in every output. */
export function isForPortfolio(targets?: Target[]): boolean {
  return !targets || targets.length === 0 || targets.includes("portfolio");
}
