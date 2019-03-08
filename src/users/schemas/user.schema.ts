import * as mongoose from 'mongoose';
import * as passportLocalMongoose from 'passport-local-mongoose';
import { defaultGoals } from '../../constants/goals';

const Schema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: [true, 'username is required'],
  },
  password: String,
  goals: {
    type: [
      {
        title: String,
      },
    ],
    default: defaultGoals,
    select: false,
  },
}, { timestamps: true });

Schema.plugin(passportLocalMongoose);

export const UserSchema = Schema;
