import { Role } from '@/types/roles.types';

export type User = {
  email: string;
  password: string;
  auhtorizationMethod?: 'Google' | 'Facebook' | 'Credentials';
  fullName: string;
  avatar: string;
  role: Role;
  status: string;
  phoneNumber?: string;
};
