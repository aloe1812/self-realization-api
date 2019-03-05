import * as mongoose from 'mongoose';
import * as passportLocalMongoose from 'passport-local-mongoose';

const Schema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: [true, 'username is required'],
  },
  password: String,
}, { timestamps: true });

Schema.plugin(passportLocalMongoose);

export const UserSchema = Schema;
