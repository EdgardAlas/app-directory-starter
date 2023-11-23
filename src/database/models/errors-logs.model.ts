import { ErrorLog } from '@/types/error-logs.types';
import mongoose, { FilterQuery } from 'mongoose';

import mongoosePaginate from 'mongoose-paginate-v2';

interface ErrorLogDocument extends mongoose.Document, Omit<ErrorLog, 'id'> {}

const schema = new mongoose.Schema<ErrorLogDocument>(
  {
    message: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    user: {
      type: String,
      ref: 'User',
    },
  },
  {
    toJSON: {
      transform: function (doc, ret) {
        delete ret.__v;
        delete ret._id;
        return ret;
      },
      virtuals: true,
    },
    toObject: {
      transform: function (doc, ret) {
        delete ret.__v;
        delete ret._id;
        return ret;
      },
      virtuals: true,
    },
    collection: 'errors-logs',
    timestamps: true,
  }
);

schema.plugin(mongoosePaginate);

export type QueryErrorLog = FilterQuery<ErrorLogDocument>;

export const ErrorsLogsModel =
  mongoose.models['ErrorsLogs'] ||
  mongoose.model<ErrorLogDocument>('ErrorsLogs', schema);
