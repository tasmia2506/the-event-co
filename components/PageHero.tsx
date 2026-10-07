import { SplitText } from './PageMotion';

export default function PageHero({ eyebrow, title, lead }: { eyebrow: string; title: string; lead?: string }) {
  return (
    <div className="section-header text-center">
      <div className="eyebrow">{eyebrow}</div>
      <SplitText as="h1" text={title} />
      {lead && <p className="section-lead">{lead}</p>}
    </div>
  );
}
