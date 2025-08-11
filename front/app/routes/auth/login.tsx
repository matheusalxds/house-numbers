import React from 'react';
import RegisterForm from '~/routes/auth/_components/auth-form';
import { Link } from 'react-router';
import { env } from '~/utils/env';

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const data = {
    email: formData.get('email'),
    password: formData.get('password'),
  };

  const res = await fetch(`${env.apiUrl}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorText = await res.text();
    return new Response(JSON.stringify({ ok: false, error: errorText || `HTTP ${res.status}` }), {
      status: res.status,
    });
  }

  const register = await res.json();
  const headers = new Headers({
    'Location': `/dashboard/snippets`,
    'Set-Cookie': `authToken=${register.token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=3600`,
  });


  if (register.token) {
    return new Response(null, { status: 302, headers });
  }
}

export default function Login() {
  const handleCreated = () => window.location.reload();

  return (
    <>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900 pb-4">Login</h1>
          <RegisterForm onCreated={handleCreated} formType="login"/>
          <div className="mt-4 text-center text-sm text-gray-600">
            Don't have an account? <Link to="/auth/register" className="text-green-700 hover:underline font-semibold">Create
            here</Link>
          </div>
        </div>
      </div>
    </>
  );
}


