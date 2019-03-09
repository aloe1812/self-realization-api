import * as mongoose from 'mongoose';
import { ObjectId } from 'bson';

export const DaySchema = new mongoose.Schema({
  userId: ObjectId,
  date: Date,
});
