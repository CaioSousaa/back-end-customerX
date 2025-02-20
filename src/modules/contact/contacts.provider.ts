import { ContactDatabase } from 'src/database/entities/Contact';
import { DataSource } from 'typeorm';

export const contactProvider = [
  {
    provide: 'CONTACT_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(ContactDatabase),
    inject: ['DATA_SOURCE'],
  },
];
