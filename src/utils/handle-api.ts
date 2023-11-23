import { connectToDatabase } from '@/database/connection';
import { CustomError } from '@/utils/custom-error';
import { validateRol } from '@/utils/validate-rol';
import { NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';

type Handler = (
  request: NextRequest,
  params: any
) => Promise<NextResponse<unknown>>;

export const handleException =
  (cb: Handler, roles: string[] = []) =>
  async (request: NextRequest, params: unknown) => {
    try {
      connectToDatabase();
      await validateRol(roles);
      return await cb(request, params);
    } catch (error) {
      console.log(error);
      console.log(error);
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

      return NextResponse.json(
        { message: 'An error has occurred, please try again later' },
        { status: 500 }
      );
    }
  };
