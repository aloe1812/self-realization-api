import { Document, Model, AuthenticationResult, Types } from 'mongoose';

export interface User extends Document {
  readonly username: string;
  readonly password?: string;
  readonly goals?: Types.DocumentArray<DefaultGoal>;
}

export interface DefaultGoal extends Document {
  title: string;
}

export interface UserModel extends Model<User> {
  authenticate(): (username: string, password: string) => Promise<AuthenticationResult>;
  register(user: User, password: string): Promise<User>;
}
