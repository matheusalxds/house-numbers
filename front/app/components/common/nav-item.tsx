import type { ReactNode } from 'react';
import { Link } from 'react-router';

import { Button } from '~/components/ui/button';
import { cn } from '~/lib/utils';

export function NavItem({
  to,
  icon,
  active,
  children,
}: {
  to: string;
  icon?: ReactNode;
  active?: boolean;
  children: ReactNode;
}) {
  return (
    <Button
      asChild
      className={cn(
        'w-full justify-start gap-2 rounded-xl px-3 py-2 text-sm text-green-700 hover:bg-green-200',
        active && 'bg-green-300',
      )}
    >
      <Link to={to} prefetch="intent">
        <span className="inline-flex items-center gap-2">
          {icon}
          <span>{children}</span>
        </span>
      </Link>
    </Button>
  );
}
