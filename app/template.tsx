import PageMotionTransition from '@/components/PageMotionTransition';

// Unlike a layout, a template re-mounts on every navigation, which is what lets
// the wipe + fade play on each route change.
export default function Template({ children }: { children: React.ReactNode }) {
  return <PageMotionTransition>{children}</PageMotionTransition>;
}
