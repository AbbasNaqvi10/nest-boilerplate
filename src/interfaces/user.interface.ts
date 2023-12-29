import { Document } from 'mongoose';
export interface IUser extends Document {
  readonly role: string;
  readonly name: string;
  readonly username: string;
  readonly password: string;
}
