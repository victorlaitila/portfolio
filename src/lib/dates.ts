const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "2024-09" -> "Sep 2024", or "09/2024" if `numeric` */
function formatYearMonth(value: string, numeric: boolean): string {
  const [year, month] = value.split("-");
  return numeric ? `${month}/${year}` : `${MONTHS[Number(month) - 1]} ${year}`;
}

/** "present" -> "Present", "expected 2026-07" -> "Exp. Jul 2026", "2024-09" -> "Sep 2024" */
function formatEndDate(value: string, numeric: boolean): string {
  if (value === "present") return "Present";
  if (value.startsWith("expected ")) return `Exp. ${formatYearMonth(value.slice("expected ".length), numeric)}`;
  return formatYearMonth(value, numeric);
}

/**
 * Formats a career.yaml start/end pair, e.g. "Sep 2024 - Present".
 * `numeric` gives the shorter "09/2024 - Present", used on narrow screens.
 */
export function formatPeriod(start: string, end: string, { numeric = false } = {}): string {
  return `${formatYearMonth(start, numeric)} - ${formatEndDate(end, numeric)}`;
}
