import { CustomerDatabase } from 'src/database/entities/Customer';
import { DataSource } from 'typeorm';

export const customerProvider = [
  {
    provide: 'CUSTOMER_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(CustomerDatabase),
    inject: ['DATA_SOURCE'],
  },
];
