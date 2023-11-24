import { CustomError } from '@/utils/custom-error';
import { getAuth } from '@/helpers/get-auth';
import { Role } from '@/types/roles.types';

export const validateRol = async (roles: string[]) => {
  if (roles.length === 0) {
    return true;
  }

  const user = await getAuth();

  if (!user) {
    throw new CustomError('Unauthorized', 401);
  }

  user.role = user.role.toLowerCase() as Role;

  roles = roles.map((role) => role.toLowerCase());

  if (user.role === 'admin') {
    return true;
  }

  const hasRole = roles.includes(user?.role as string);

  if (!hasRole) {
    throw new CustomError('Unauthorized', 401);
  }

  return true;
};
