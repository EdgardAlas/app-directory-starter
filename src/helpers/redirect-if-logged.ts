import { getAuth } from '@/helpers/get-auth';
import { redirect } from 'next/navigation';

export const redirectIfLogged = async () => {
  const session = await getAuth();
  if (session) {
    return redirect('/');
  }

  return;
};
