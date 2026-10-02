import { useEffect, useState, type RefObject } from "react";

/** True once the element has scrolled into view. Stays true afterwards. */
export function useInView(ref: RefObject<Element>, threshold = 0.25): boolean {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || inView) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, threshold, inView]);

  return inView;
}
