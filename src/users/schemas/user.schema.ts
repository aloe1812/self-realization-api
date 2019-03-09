import * as mongoose from 'mongoose';
import * as passportLocalMongoose from 'passport-local-mongoose';
import { defaultGroups } from '../../constants/default-groups';

const Schema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: [true, 'username is required'],
  },
  password: String,
  groups: {
    type: [
      {
        type: {
          type: String,
        },
        goals: [
          {
            title: String,
          },
        ],
      },
    ],
    default: defaultGroups,
    select: false,
  },
}, { timestamps: true });

Schema.plugin(passportLocalMongoose);

export const UserSchema = Schema;
