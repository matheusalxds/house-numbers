import { useEffect, useState } from 'react';
import { useFetcher } from 'react-router';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { PlusIcon } from 'lucide-react';

import {
  Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from '~/components/ui/dialog';
import { Button } from '~/components/ui/button';
import { Label } from '~/components/ui/label';
import { Textarea } from '~/components/ui/textarea';

const schema = z.object({
  text: z
    .string({ error: 'Required field' })
    .trim()
    .min(20, 'Min 20 characters')
    .max(500, 'Max 500 characters'),
});

type FormValues = z.infer<typeof schema>;
type Props = { triggerLabel?: string; onCreated?: (snippet: any) => void };

export function CreateSnippetDialog({ onCreated }: Props) {
  const [open, setOpen] = useState(false);
  const fetcher = useFetcher<{ ok: boolean; error?: string; snippet?: any }>();

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors, isValid },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: { text: '' },
  });

  useEffect(() => {
    if (fetcher.state === 'idle' && fetcher.data?.ok) {
      onCreated?.(fetcher.data.snippet);
      reset();
      setOpen(false);
    }
  }, [fetcher.state, fetcher.data, onCreated, reset]);

  const onSubmit = (values: FormValues) => {
    const fd = new FormData();
    fd.append('text', values.text);
    fetcher.submit(fd, { method: 'post' });
  };

  const loading = isSubmitting || fetcher.state !== 'idle';

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost"><PlusIcon className="h-5 w-5"/>Create snippet</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Create Snippet</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="text">Text</Label>
            <Textarea
              id="text"
              rows={6}
              {...register('text')}
              placeholder="Add your thoughts here, and we'll summarize them for you."
            />
            {errors.text && (
              <p className="text-sm text-red-600" role="alert">
                {errors.text.message}
              </p>
            )}
          </div>
          {fetcher.data?.error && (
            <p className="text-sm text-red-600" role="alert">{fetcher.data.error}</p>
          )}
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading || !isValid}>
              {loading ? 'Saving…' : 'Save'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
