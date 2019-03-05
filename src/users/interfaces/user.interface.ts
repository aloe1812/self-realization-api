import { Document, Model, AuthenticationResult } from 'mongoose';

export interface User extends Document {
  readonly username: string;
  readonly password?: string;
}

export interface UserModel extends Model<User> {
  authenticate(): (username: string, password: string) => Promise<AuthenticationResult>;
  register(user: User, password: string): Promise<User>;
}
