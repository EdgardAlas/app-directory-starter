import { connect, connection } from 'mongoose';
const { MONGO_URI } = process.env;

export const connectToDatabase = async () => {
  if (!connection.readyState) {
    return connect(MONGO_URI as string);
  }

  return connection;
};
