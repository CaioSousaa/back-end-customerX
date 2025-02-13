import { CustomerDatabase } from 'src/database/entities/Customer';
import { DataSource } from 'typeorm';

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
        entities: [CustomerDatabase],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];
