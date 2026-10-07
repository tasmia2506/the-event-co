// A thin static line.
export default function DrawLine({ className, origin = 'left' }: { className?: string; delay?: number; origin?: 'left' | 'center' | 'right' }) {
  return <span aria-hidden="true" className={className} style={{ display: 'block', transformOrigin: origin }} />;
}
