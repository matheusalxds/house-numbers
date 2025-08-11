import { useLoaderData, useParams } from 'react-router';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '~/components/ui/card';
import { getHeaders } from '~/routes/auth/utils/get-token';
import { env } from '~/utils/env';

export type SnippetDetail = {
  _id: string;
  summary: string;
  text: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

type LoaderArgs = {
  request: Request;
  params: { id?: string };
};

export async function loader({ params, request }: LoaderArgs) {
  if (!params.id) {
    throw new Response('Snippet ID is required', { status: 400 });
  }

  const headers = getHeaders(request);
  const res = await fetch(`${env.apiUrl}/snippets/${params.id}`, { headers });
  if (!res.ok) {
    throw new Response('Snippet not found', { status: res.status });
  }

  return (await res.json()) as SnippetDetail;
}

export default function SnippetDetailPage() {
  const snippet = useLoaderData() as SnippetDetail;
  const { id } = useParams();

  return (
    <Card className="max-w-2xl">
      <CardHeader>
        <CardTitle>Snippet Details</CardTitle>
        <CardDescription>ID: {id}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <p>
          <strong>Summary:</strong> {snippet.summary}
        </p>
        <p>
          <strong>Text:</strong> {snippet.text}
        </p>
        <p>
          <strong>Created At:</strong>{' '}
          {new Date(snippet.createdAt).toLocaleString()}
        </p>
        <p>
          <strong>Updated At:</strong>{' '}
          {new Date(snippet.updatedAt).toLocaleString()}
        </p>
      </CardContent>
    </Card>
  );
}
