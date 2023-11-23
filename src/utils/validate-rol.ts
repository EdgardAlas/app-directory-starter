export const validateRol = async (roles: string[]) => {
  /* if (roles.length === 0) {
    return true;
  }

  const token = cookies().get('token')?.value;

  const { sub } = await verifyToken<{ sub: string }>(token as string);

  const user = await UserModel.findById(sub);

  if (!user) {
    throw new CustomError('User not found', 404);
  }

  user.role = user.role.toLowerCase();
  roles = roles.map((role) => role.toLowerCase());

  if (user.role === 'admin') {
    return true;
  }

  const hasRole = roles.includes(user?.role as string);

  if (!hasRole) {
    throw new CustomError('Unauthorized', 401);
  } */

  return true;
};
