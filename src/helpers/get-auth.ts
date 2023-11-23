import { authOptions } from '@/helpers/auth';
import { User } from '@/types/user.types';
import { getServerSession } from 'next-auth';

export const getAuth = () =>
  getServerSession(authOptions).then((session) => session?.user as User);
