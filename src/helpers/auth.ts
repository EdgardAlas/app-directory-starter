import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import { NextAuthOptions } from 'next-auth';
import { connectToDatabase } from '@/database/connection';
import { UserModel } from '@/database/models/users.model';

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: 'login',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },

      async authorize(credentials, req) {
        if (!credentials) {
          return null;
        }

        const { email, password } = credentials;

        connectToDatabase();

        const findUser = await UserModel.findOne({ email });

        if (!findUser) {
          return null;
        }

        const validatePassword = await bcrypt.compare(
          password,
          findUser.password
        );

        if (!validatePassword) {
          return null;
        }

        return {
          id: findUser.id,
        };
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session: async ({ session, token }) => {
      // @ts-ignore
      session.user.id = token.id;

      const findUser = await UserModel.findById(token.id);

      session.user = findUser?.toObject();

      return session;
    },
  },
};
