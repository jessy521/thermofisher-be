import * as mongoose from 'mongoose';

export const ParticipantSchema = new mongoose.Schema({
  name: String,
  country: String,
  email: String,
  type: String,
  distributor: String,
  mentor: String,
  manager: String,
  rNj: String,
  status: String,
  createdAt: new Date(),
});
