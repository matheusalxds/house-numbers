import type { Route } from './+types/redirect';
import { redirect } from 'react-router';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'House Number' },
  ];
}

export function loader() {
  return redirect('/auth/login');
}

export default function Redirect() {
  return null;
}
