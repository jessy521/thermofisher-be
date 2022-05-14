import { Connection } from 'mongoose';
import { catalogSchema } from './schema/catalog.schema';

export const catalogProvider = [
  {
    provide: 'CATALOG_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('catalog', catalogSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
