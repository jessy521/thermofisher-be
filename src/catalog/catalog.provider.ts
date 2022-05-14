import { Connection } from 'mongoose';

export const catalogProvider = [
  {
    provide: 'CATALOG_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('catalog', catalogSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
