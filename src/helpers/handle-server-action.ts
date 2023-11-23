import { connectToDatabase } from '@/database/connection';
import { createErrorLog } from '@/helpers/create-error-log';
import { CustomError } from '@/utils/custom-error';
import { validateRol } from '@/helpers/validate-rol';
import { ZodError } from 'zod';
import { Role } from '@/types/roles.types';

export const handleServerAction =
  <T extends (...args: Parameters<T>) => ReturnType<T>>(
    callback: T,
    {
      roles,
      shouldConnectToDatabase = true,
    }: { roles: Role[]; shouldConnectToDatabase?: boolean } = {
      roles: [],
      shouldConnectToDatabase: true,
    }
  ) =>
  async (...args: Parameters<T>) => {
    try {
      if (shouldConnectToDatabase) {
        await connectToDatabase();
      }
      await validateRol(roles);
      return await callback(...args);
    } catch (error) {
      console.log(error);
      if (error instanceof CustomError) {
        return {
          error: {
            message: error.message,
            status: error.status,
          },
        };
      }

      if (error instanceof ZodError) {
        return {
          error: {
            message: error.errors[0].message,
            status: 400,
          },
        };
      }

      createErrorLog(error as Error);

      return {
        error: {
          message: "Something went wrong, we're working on it",
          status: 500,
        },
      };
    }
  };
