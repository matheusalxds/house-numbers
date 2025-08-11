import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFetcher } from 'react-router';

import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form';

const schema = z.object({
  email: z.email('Required').trim(),
  password: z.string().min(8, 'Min 8 characters').trim(),
});

type FormData = z.infer<typeof schema>

type Props = { onCreated: () => void, formType: 'register' | 'login' };
export default function AuthForm({ onCreated, formType }: Props) {
  const fetcher = useFetcher<{ ok: boolean; error?: string; snippet?: any }>();

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
    defaultValues: { email: 'm@gmail.com', password: '12345678' },
  });

  useEffect(() => {
    if (fetcher.state === 'idle' && fetcher.data?.ok) {
      console.log('fetchData', fetcher.data.snippet);
      onCreated();
      form.reset();
    }
  }, [fetcher.state, fetcher.data, form]);

  function onSubmit(values: FormData) {
    const fd = new FormData();
    fd.append('email', values.email);
    fd.append('password', values.password);

    fetcher.submit(fd, {
      method: 'post',
      action: `/auth${formType === 'register' ? '/register' : '/login'}`,
    });
  }

  const loading = form.formState.isSubmitting || fetcher.state !== 'idle';

  const btnSubmitTitles = {
    register: 'Register',
    login: 'Login',
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="voce@exemplo.com"
                  type="email"
                  autoComplete="email"
                  {...field}
                />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="••••••••"
                  type="password"
                  autoComplete="current-password"
                  {...field}
                />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full"
          disabled={loading || !form.formState.isValid}
        >
          {loading ? 'Loading...' : btnSubmitTitles[formType]}
        </Button>
      </form>
    </Form>
  );
}
