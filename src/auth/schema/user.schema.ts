import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  isEmailConfirmed: Boolean,
  role: String,
  password: String,
});
