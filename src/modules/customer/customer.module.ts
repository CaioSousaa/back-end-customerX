import { Module } from '@nestjs/common';
import { customerProvider } from './customer.provider';
import { DatabaseModule } from 'src/database/database.module';
import { CustomerController } from './infa/http/customer.controller';
import { CreateCustomerService } from './services/CreateCustomer.service';
import { BcryptHash } from './providers/hash/implementation/BcryptHash';
import { TypeormCustomerRepository } from 'src/external/repositories/TypeormCustomerRepository';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...customerProvider,
    CreateCustomerService,
    BcryptHash,
    TypeormCustomerRepository,
  ],
  controllers: [CustomerController],
})
export class CustomerModule {}
