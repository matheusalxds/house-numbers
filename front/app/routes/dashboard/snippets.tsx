import { Link, useLoaderData, useLocation, useNavigate } from 'react-router';
import { useState } from 'react';
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { toast } from "sonner"

import { Paginate } from '~/components/common/paginate';
import { CreateSnippetDialog } from '~/routes/dashboard/_components/create-snippet-dialog';
import { getHeaders } from '~/routes/auth/utils/get-token';
import { env } from '~/utils/env';

export type Snippet = {
  _id: string;
  summary: string;
  text: string;
  createdAt: string;
  updatedAt: string;
};

export type SnippetsResponse = {
  data: Snippet[];
  total: number;
  totalPages: number;
};

type LoaderArgs = {
  request: Request;
  params: Record<string, string | undefined>;
};

export async function loader({ request }: LoaderArgs) {
  const headers = getHeaders(request);

  const url = new URL(request.url);
  const page = Number(url.searchParams.get('page') || '1');
  const limit = Number(url.searchParams.get('limit') || '10');

  const res = await fetch(
    `${env.apiUrl}/snippets?page=${page}&limit=${limit}`,
    { headers },
  );
  return res.json();
}

export async function action({ request }: { request: Request }) {
  const headers = getHeaders(request);
  const formData = await request.formData();
  const text = String(formData.get('text') || '').trim();

  const res = await fetch(`${env.apiUrl}/snippets`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ text }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    return new Response(JSON.stringify({ ok: false, error: errorText || `HTTP ${res.status}` }), {
      status: res.status,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const snippet = await res.json();

  return new Response(null, {
    status: 302,
    headers: { Location: `/dashboard/snippets/${snippet._id}` },
  });
}

export default function Snippets() {
  const [currentPage, setCurrentPage] = useState(1);

  const location = useLocation();
  const navigate = useNavigate();
  const { data, total, totalPages } = useLoaderData<SnippetsResponse>();
  const columnHelper = createColumnHelper<Snippet>();

  const columns = [
    columnHelper.accessor('_id', {
      header: 'ID',
      cell: (info) => (
        <Link
          to={`/dashboard/snippets/${info.getValue()}`}
          className="text-green-600 underline"
        >
          {info.getValue()}
        </Link>
      ),
    }),
    columnHelper.accessor('summary', {
      header: 'Summary',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('text', {
      header: 'Text',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('createdAt', {
      header: 'Created At',
      cell: (info) => new Date(info.getValue()).toLocaleString(),
    }),
    columnHelper.accessor('updatedAt', {
      header: 'Updated At',
      cell: (info) => new Date(info.getValue()).toLocaleString(),
    }),
  ];

  const table = useReactTable({ data, columns, getCoreRowModel: getCoreRowModel() });

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    const params = new URLSearchParams(location.search);
    params.set('page', String(newPage));
    params.set('limit', String(10));
    navigate(`?${params.toString()}`);
  };

  const handleCreated = () => window.location.reload();

  return (
    <>
      <div className="flex justify-between items-start">
        <h1 className="text-xl font-bold mb-4">Snippets</h1>
        <CreateSnippetDialog onCreated={handleCreated}/>
      </div>
      <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full table-auto text-sm">
            <thead className="sticky top-0 z-10 bg-muted/50 backdrop-blur">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="border-b">
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-4 py-3 text-left font-medium text-muted-foreground"
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
            </thead>

            <tbody className="[&_tr:last-child]:border-0">
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="border-b transition-colors hover:bg-muted/40"
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-3 align-middle">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>
      <Paginate
        counter={total}
        currentPage={currentPage}
        pageCount={totalPages}
        onChange={handlePageChange}
      />
    </>
  );
}


