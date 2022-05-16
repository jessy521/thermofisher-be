import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';
import { Item } from 'src/item/interface/item.interface';

export const CurriculumSchema = new mongoose.Schema({
  title: String,
  curriculumNo: Number,
  technology: String,
  status: String,
  owner: String,
  emeaTrainer: String,
  apjTrainer: String,
  natTrainer: String,
  sme: String,
  item: [
    {
      type: Schema.Types.ObjectId,
      ref: Item,
    },
  ],
  createdAt: { type: Date, default: new Date() },
});
