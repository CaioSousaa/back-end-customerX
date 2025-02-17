import { Inject } from '@nestjs/common';
import { Customer } from 'src/modules/customer/domain/entities/Customer';
import { ICustomerRepository } from 'src/modules/customer/port/ICustomerRepository';
import { Repository } from 'typeorm';

export class TypeormCustomerRepository implements ICustomerRepository {
  constructor(
    @Inject('CUSTOMER_REPOSITORY')
    private custumerRepository: Repository<Customer>,
  ) {}

  async returnCustomerByEmail(email: string): Promise<Customer | null> {
    const customerExists = await this.custumerRepository.findOneBy({
      email,
    });

    if (!customerExists) {
      return null;
    }

    return customerExists;
  }

  async saveCustomer(customer: Customer): Promise<void> {
    await this.custumerRepository.save(customer);
  }

  async create({ email, fullname, password }: Customer): Promise<Customer> {
    const newCustomer = this.custumerRepository.create({
      email,
      fullname,
      password,
      createdAt: new Date(),
    });

    return newCustomer;
  }

  async findCustomerByEmail(email: string): Promise<boolean> {
    const customerExists = await this.custumerRepository.findOneBy({
      email,
    });

    if (customerExists) {
      return true;
    }

    return false;
  }
}
