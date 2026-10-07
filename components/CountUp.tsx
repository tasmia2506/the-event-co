// Renders a stat label like "500+" or "100%" as-is.
export default function CountUp({ value }: { value: string }) {
  return <span>{value}</span>;
}
