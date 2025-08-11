import type { Route } from "./+types/not-found";
import { Link } from 'react-router';
import { Home } from 'lucide-react';

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Page Not Found" },
  ];
}

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gray-50 px-6 text-center">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <p className="mt-4 text-lg text-gray-600">Page not found</p>
      <p className="mt-2 text-gray-500">
        Sorry, we couldn’t find the page you’re looking for.
      </p>
      <Link
        to="/auth/login"
        className="flex gap-2 mt-6 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1"
      >
        <Home /> Return to login
      </Link>
    </div>
  )
}
