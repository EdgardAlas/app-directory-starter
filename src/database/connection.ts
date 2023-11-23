import { connect, connection } from 'mongoose';
const { MONGO_URI } = process.env;

const options: any = {
  useUnifiedTopology: true,

  useNewUrlParser: true,
};

export const connectToDatabase = async () => {
  if (!connection.readyState) {
    return connect(MONGO_URI as string, options);
  }

  return connection;
};
