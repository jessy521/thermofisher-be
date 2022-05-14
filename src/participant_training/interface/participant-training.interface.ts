import { ObjectId } from 'mongoose';

export class participantTraining {
  curriculamId: ObjectId;
  participantId: ObjectId;
  location: string;
  year: number;
  quater: number;
}
