import * as mongoose from 'mongoose';
import { Curriculum } from 'src/curriculum/interface/curriculum.interface';
import { Schema } from 'mongoose';

export const ItemSchema = new mongoose.Schema({
  courceType: String,
  itemNo: String,
  sflmsName: String,
  psgCertificate: Boolean,
  noCertificate: Boolean,
  dx: Boolean,
  dueDateDays: String,
  owner: String,
  curriculumId: [
    {
      type: Schema.Types.ObjectId,
      ref: Curriculum,
    },
  ],
  launchDate: Date,
  createdAt: new Date(),
});
