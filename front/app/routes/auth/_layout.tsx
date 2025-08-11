import { Outlet } from 'react-router';

export default function RegisterLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="bg-background">
        <Outlet/>
      </main>
      <footer className="border-t bg-white p-4 text-sm text-muted-foreground">
        House Numbers - Mortgage Loan Processor
      </footer>
    </div>
  );
}

