import { connectToDatabase } from '@/database/connection';
import { ErrorsLogsModel } from '@/database/models/errors-logs.model';
import { CustomError } from '@/utils/custom-error';
import { getAuth } from '@/helpers/get-auth';

export const createErrorLog = async (error: Error | CustomError) => {
  try {
    await connectToDatabase();
    const user = await getAuth();

    const userName = user?.fullName || 'Not logged in';

    ErrorsLogsModel.create({
      user: userName,
      message: error.message,
    });
  } catch (error) {}
};
