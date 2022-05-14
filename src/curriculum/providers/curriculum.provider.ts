import { Connection } from 'mongoose';
import { CurriculumSchema } from '../schema/curriculum.schema';

export const curriculumProviders = [
  {
    provide: 'CURRICULUM_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Curriculum', CurriculumSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
