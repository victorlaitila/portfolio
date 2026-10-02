import type { ReactNode } from "react";

/** Accent-arrow bullet list used in the Experience and Education cards. */
export function BulletList({ items }: { items: ReactNode[] }) {
  if (items.length === 0) return null;

  return (
    <ul className="space-y-3">
      {items.map((item, index) => (
        <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
          <span className="text-accent">▹</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
