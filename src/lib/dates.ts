const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "2024-09" -> "Sep 2024" */
function formatYearMonth(value: string): string {
  const [year, month] = value.split("-");
  return `${MONTHS[Number(month) - 1]} ${year}`;
}

/** "present" -> "Present", "expected 2026-07" -> "Exp. Jul 2026", "2024-09" -> "Sep 2024" */
function formatEndDate(value: string): string {
  if (value === "present") return "Present";
  if (value.startsWith("expected ")) return `Exp. ${formatYearMonth(value.slice("expected ".length))}`;
  return formatYearMonth(value);
}

/** Formats a career.yaml start/end pair, e.g. "Sep 2024 - Present". */
export function formatPeriod(start: string, end: string): string {
  return `${formatYearMonth(start)} - ${formatEndDate(end)}`;
}
