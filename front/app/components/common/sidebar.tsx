import { useLocation } from 'react-router';
import { cn } from '~/lib/utils';
import { NavItem } from '~/components/common/nav-item';
import { FileCode2 } from 'lucide-react';

export function Sidebar({ className }: { className?: string }) {
  const { pathname } = useLocation();
  const isSnippets = pathname.startsWith("/dashboard/snippets");

  return (
    <aside
      className={cn(
        "border-r bg-white px-4 py-6",
        className
      )}
      aria-label="Sidebar"
    >
      <div className="mb-6 flex items-center gap-2">
        <div className="grid h-9 w-9 place-items-center rounded-xl border">
          <span className="text-sm font-semibold text-green-700">HN</span>
        </div>
        <div className="flex flex-col">
          <span className="text-base font-semibold tracking-tight text-green-700">House Numbers</span>
          <span className="text-xs text-green-800">Tech challenge</span>
        </div>
      </div>

      <nav className="space-y-1">
        <NavItem
          to="/dashboard/snippets"
          icon={<FileCode2 className="h-4 w-4" />}
          active={isSnippets}
        >
          Snippets
        </NavItem>
      </nav>
    </aside>
  );
}
