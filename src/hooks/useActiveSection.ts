import { useEffect, useState, type Dispatch, type SetStateAction } from "react";

/** Distance below the top of the viewport at which a section counts as reached (clears the nav bar). */
const SCROLL_OFFSET_PX = 100;
const DEBOUNCE_MS = 50;

/**
 * Tracks which of the given section ids the user has scrolled to.
 * Also returns a setter so a nav click can highlight its target right away.
 */
export function useActiveSection<T extends string>(ids: readonly T[]): [T, Dispatch<SetStateAction<T>>] {
  const [active, setActive] = useState<T>(ids[0]);

  useEffect(() => {
    const update = () => {
      const position = window.scrollY + SCROLL_OFFSET_PX;
      const reached = ids.filter((id) => {
        const element = document.getElementById(id);
        return element !== null && element.offsetTop <= position;
      });
      if (reached.length > 0) setActive(reached[reached.length - 1]);
    };

    update();

    let timeout: ReturnType<typeof setTimeout>;
    const onScroll = () => {
      clearTimeout(timeout);
      timeout = setTimeout(update, DEBOUNCE_MS);
    };

    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(timeout);
    };
  }, [ids]);

  return [active, setActive];
}
