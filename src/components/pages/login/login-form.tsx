'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

export const LoginForm = () => {
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      email: 'test@test.com',
      password: '123',
    },
  });

  return (
    <div>
      <h1>Login</h1>
      <p>This is the login page</p>

      <form
        onSubmit={form.handleSubmit(async (data) => {
          const response = await signIn('credentials', {
            redirect: false,
            email: data.email,
            password: data.password,
          });

          if (response) {
            router.push('/');
          }
        })}
      >
        <input type='email' placeholder='Email' {...form.register('email')} />
        <input
          type='password'
          placeholder='Password'
          {...form.register('password')}
        />

        <button type='submit'>Login</button>
      </form>
    </div>
  );
};
