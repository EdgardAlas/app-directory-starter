'use server';

import bcrypt from 'bcrypt';

import { handleServerAction } from '@/helpers/handle-server-action';

export const createUser = handleServerAction(
  async () => {
    /* random exception */

    console.log('Creating user');

    /* await connectToDatabase();

  await UserModel.create({
    fullName: 'John Doe',
    email: 'test@test.com',
    password: await hashPassword('123'),
    avatar: '',
    status: 'active',
    role: 'admin',
    phoneNumber: '123456789',
    auhtorizationMethod: 'Credentials',
  }); */
  },
  {
    roles: ['admin'],
  }
);

const hashPassword = async (password: string) => {
  const salt = bcrypt.genSaltSync();
  return await bcrypt.hash(password, salt);
};
