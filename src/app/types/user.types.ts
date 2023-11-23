export type User = {
  email: string;
  password: string;
  auhtorizationMethod?: 'Google' | 'Facebook' | 'Credentials';
  fullName: string;
  avatar: string;
  role: string;
  status: string;
  phoneNumber?: string;
};
