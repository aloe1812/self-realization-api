import { ObjectId } from 'bson';
import { Schema } from 'mongoose';
import { Group, Day } from '../interfaces/day.interface';
import { formatDate } from '../../utils/common';

const toJSONOptions = {
  virtuals: true,
  versionKey: false,
  transform(doc: any, ret: any) {
    delete ret.id;

    if (ret.date) {
      ret.date = formatDate(ret.date);
    }
  },
};

// Group (child) Schema
const GroupSchema = new Schema({
  type: {
    type: String,
  },
  goals: [
    {
      title: String,
      complete: {
        type: Number,
        default: 0,
      },
    },
  ],
});

GroupSchema.virtual('complete').get(function() {
  if (!this.goals.length) {
    return 0;
  }

  const result = (this as Group).goals.reduce((a, c) => a + c.complete, 0) / this.goals.length;

  return +result.toFixed(2);
});

GroupSchema.set('toJSON', toJSONOptions);

// Day (parent) Schema
const DaySchema = new Schema({
  userId: ObjectId,
  date: Date,
  groups: [GroupSchema],
});

DaySchema.virtual('complete').get(function() {
  if (!this.groups.length) {
    return 0;
  }

  const result = (this as Day).groups.reduce((a, g) => a + g.complete, 0) / this.groups.length;

  return +result.toFixed(2);
});

DaySchema.set('toJSON', toJSONOptions);

export default DaySchema;
