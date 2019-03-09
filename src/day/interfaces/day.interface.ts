import { Document, Types } from 'mongoose';
import { GroupType } from '../../enums/group-type.enum';

export interface Day extends Document {
  date: Date;
  userId: string;
  groups: Types.DocumentArray<Group>;
  readonly complete: number;
}

export interface Group extends Document {
  type: GroupType;
  goals: Types.DocumentArray<Goal>;
  readonly complete: number;
}

export interface Goal extends Document {
  title: string;
  complete: number;
}
