import { model, Schema, Document } from 'mongoose';

interface IUserSchema extends Document {
  idUserDiscord?: string;
  readyToLogIn?: boolean;
  reAuthenticate?: string;
  passAuthenticate?: string;
  user?: string;
  password?: string;
}

const User = new Schema<IUserSchema>({
  idUserDiscord: String,
  readyToLogIn: Boolean,
  reAuthenticate: String,
  passAuthenticate: String,
  user: String,
  password: String,
});

export default model<IUserSchema>('User', User);
