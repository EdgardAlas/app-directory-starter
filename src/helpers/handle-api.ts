import { connectToDatabase } from '@/database/connection';
import { createErrorLog } from '@/helpers/create-error-log';
import { CustomError } from '@/utils/custom-error';
import { validateRol } from '@/helpers/validate-rol';
import { NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { Role } from '@/types/roles.types';

type Handler = (
  request: NextRequest,
  params: any
) => Promise<NextResponse<unknown>>;

export const handleApi =
  (
    cb: Handler,
    {
      roles,
      shouldConnectToDatabase = true,
    }: { roles: Role[]; shouldConnectToDatabase?: boolean } = {
      roles: [],
      shouldConnectToDatabase: true,
    }
  ) =>
  async (request: NextRequest, params: unknown) => {
    try {
      if (shouldConnectToDatabase) {
        await connectToDatabase();
      }

      await validateRol(roles);
      return await cb(request, params);
    } catch (error) {
      if (error instanceof CustomError) {
        return NextResponse.json(
          {
            message: error.message,
          },
          { status: error.status }
        );
      }

      if (error instanceof ZodError) {
        return NextResponse.json(
          {
            message: error.errors[0].message,
          },
          { status: 400 }
        );
      }

      createErrorLog(error as Error);

      return NextResponse.json(
        { message: "Something went wrong, we're working on it" },
        { status: 500 }
      );
    }
  };
