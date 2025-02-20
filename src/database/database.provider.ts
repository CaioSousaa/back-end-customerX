import { CustomerDatabase } from 'src/database/entities/Customer';
import { DataSource } from 'typeorm';
import { ContactDatabase } from './entities/Contact';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: '12345',
        database: 'customerx',
        entities: [CustomerDatabase, ContactDatabase],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];
