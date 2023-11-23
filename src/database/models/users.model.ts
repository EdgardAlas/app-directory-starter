import { User } from '@/types/user.types';
import mongoose, { FilterQuery } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

interface UserDocument extends mongoose.Document, Omit<User, 'id'> {}

const schema = new mongoose.Schema<UserDocument>(
  {
    fullName: {
      type: String,
      required: [true, 'Please enter your name'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please enter your email'],
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: false,
      trim: true,
    },
    phoneNumber: {
      type: String,
      trim: true,
    },
    avatar: {
      type: String,
    },
    role: {
      type: String,
      enum: ['admin', 'editor', 'user'],
      default: 'user',
      lowercase: true,
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
      required: true,
      lowercase: true,
    },
    auhtorizationMethod: {
      type: String,
      enum: ['google', 'facebook', 'credentials'],
      lowercase: true,
    },
  },
  {
    toJSON: {
      transform: function (doc, ret) {
        delete ret.password;
        delete ret.__v;
        delete ret._id;
        return ret;
      },
      virtuals: true,
    },
    toObject: {
      transform: function (doc, ret) {
        delete ret.password;
        delete ret.__v;
        delete ret._id;
        return ret;
      },
      virtuals: true,
    },
    timestamps: true,
    collection: 'users',
  }
);

export type QueryUsers = FilterQuery<UserDocument>;

schema.plugin(mongoosePaginate);

export const UserModel =
  (mongoose.models.Users as mongoose.PaginateModel<UserDocument>) ||
  mongoose.model<UserDocument, mongoose.PaginateModel<UserDocument>>(
    'Users',
    schema
  );
