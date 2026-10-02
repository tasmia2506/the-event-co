const WORDS = ['IDEAS', 'PEOPLE', 'PRODUCTION', 'PERFECTION'];

export default function Marquee() {
  const row = (hidden: boolean) => (
    <div className="marquee-row" aria-hidden={hidden || undefined}>
      {[...WORDS, ...WORDS].map((w, i) => (
        <span key={i} className="marquee-item">
          {w}
          <i className="marquee-dot" />
        </span>
      ))}
    </div>
  );
  return (
    <div className="marquee" role="presentation">
      <div className="marquee-track">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
