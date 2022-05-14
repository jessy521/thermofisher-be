import { Connection } from 'mongoose';
import { ParticipantSchema } from '../schema/participant.schema';

export const participantProviders = [
  {
    provide: 'PARTICIPANT_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Participant', ParticipantSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
