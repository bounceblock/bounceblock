/**
 * Pass-through layout for the (app) group. Auth pages render their own
 * full-screen AuthShell; product pages render the sidebar AppShell.
 */
export default function AppLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
