import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { contactProvider } from './contacts.provider';
import { customerProvider } from '../customer/customer.provider';
import { TypeormContactRepository } from 'src/external/repositories/TypeormContactRepository';
import { TypeormCustomerRepository } from 'src/external/repositories/TypeormCustomerRepository';
import { ContactController } from './infra/http/contact.controller';
import { CreateContactService } from './services/CreateContact.service';
import { FindManyContactsOfTheCustomerService } from './services/FindManyContactsOfTheCustomer.service';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...contactProvider,
    ...customerProvider,
    CreateContactService,
    TypeormContactRepository,
    TypeormCustomerRepository,
    FindManyContactsOfTheCustomerService,
  ],
  controllers: [ContactController],
})
export class ContactModule {}
