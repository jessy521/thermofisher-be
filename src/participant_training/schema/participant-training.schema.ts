import * as mongoose from 'mongoose';
import { Curriculum } from 'src/curriculum/interface/curriculum.interface';
import { Participant } from 'src/participant/interface/participant.interface';

export const participantTrainingSchema = new mongoose.Schema({
  curriculamId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Curriculum,
  },
  participantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Participant,
  },
  location: String,
  year: String,
  quater: String,
});
