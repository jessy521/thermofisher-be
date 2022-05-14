import { Connection } from 'mongoose';
import { participantTrainingSchema } from './schema/participant-training.schema';

export const participantTrainingProviders = [
  {
    provide: 'PARTICIPANT-TRAINING_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('participantTraining', participantTrainingSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
