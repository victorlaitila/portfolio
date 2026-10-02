/** Light sweep across the nearest `group` parent on hover. */
export function Shimmer() {
  return (
    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
  );
}
