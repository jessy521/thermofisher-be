import { ObjectId } from 'mongoose';

export class participantTraining {
  curriculamId: { type: ObjectId; required: true };
  participantId: { type: ObjectId; required: true };
  location: string;
  year: number;
  quater: number;
}
