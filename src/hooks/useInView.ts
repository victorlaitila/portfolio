import { useEffect, useState, type RefObject } from "react";

/**
 * True once the element's top has scrolled a quarter of the way up the viewport. Stays true afterwards.
 * Measured from the top rather than as a share of the element, which a tall element on a short
 * screen (a phone turned sideways) may never reach.
 */
export function useInView(ref: RefObject<Element>): boolean {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || inView) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { rootMargin: "0px 0px -25% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, inView]);

  return inView;
}
