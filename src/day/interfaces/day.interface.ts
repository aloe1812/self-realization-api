import { Document } from 'mongoose';

export interface Day extends Document {
  date: Date;
}
