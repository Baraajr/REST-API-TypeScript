import mongoose, { Schema, Document } from 'mongoose';
import { UserDocument } from './user.model';

export interface SessionDocument extends Document {
  user: UserDocument['_id'];
  valid: boolean;
  userAgent: string;
  createdAt: Date;
  updatedAt: Date;
}

const sessionSchema = new Schema<SessionDocument>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true, // Index for faster queries
    },
    valid: { type: Boolean, default: true },
    userAgent: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const SessionModel = mongoose.model<SessionDocument>('Session', sessionSchema);

export default SessionModel;
