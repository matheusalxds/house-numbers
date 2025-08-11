import { Outlet } from 'react-router';
import { Sidebar } from '~/components/common/sidebar';

export default function DashboardLayout() {
  return (
    <div className="grid min-h-screen grid-cols-[16rem_1fr] grid-rows-[1fr_auto]">
      <Sidebar className="row-span-2" />
      <main className="bg-background p-6">
        <Outlet />
      </main>
      <footer className="border-t bg-white p-4 text-sm text-muted-foreground">
        House Numbers - Mortgage Loan Processor
      </footer>
    </div>
  );
}

