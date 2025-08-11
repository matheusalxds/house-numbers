export function getCookies(request: Request): Record<string, string> {
  const cookieHeader = request.headers.get('Cookie') || '';
  return Object.fromEntries(
    cookieHeader.split('; ').filter(Boolean).map(cookie => {
      const [name, value] = cookie.split('=');
      return [name, value];
    }),
  );
}

export function getHeaders(request: Request): HeadersInit {
  const headers: HeadersInit = { 'Content-Type': 'application/json' };

  try {
    const cookies = getCookies(request);
    const token = cookies.authToken;

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  } catch (error) {
    console.error('token process fail:', error);
  }

  return headers;
}
