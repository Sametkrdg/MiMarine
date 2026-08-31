"use client";

import { usePathname } from "next/navigation";

/**
 * Fades each route in from just below its resting position.
 *
 * The key is the reason this is a client component: without it React reuses
 * the wrapper across soft navigations and the animation never restarts. The
 * children are still rendered on the server and passed through untouched, so
 * nothing below this point is pulled into the client bundle.
 */
export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <div key={pathname} className="page-enter">
      {children}
    </div>
  );
}
