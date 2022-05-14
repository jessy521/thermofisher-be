import * as mongoose from 'mongoose';
import { Curriculum } from 'src/curriculum/interface/curriculum.interface';
import { Item } from 'src/item/interface/item.interface';

export const catalogSchema = new mongoose.Schema({
  curriculamId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: Curriculum,
    },
  ],

  items: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: Item,
    },
  ],
});
