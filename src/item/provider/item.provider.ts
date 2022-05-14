import { Connection } from 'mongoose';
import { ItemSchema } from '../schema/item.schema';

export const itemProviders = [
  {
    provide: 'ITEM_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Item', ItemSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
