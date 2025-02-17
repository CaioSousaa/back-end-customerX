import { Inject, NotAcceptableException } from '@nestjs/common';
import { ICustomerRepository } from '../port/ICustomerRepository';
import { BcryptHash } from '../providers/hash/implementation/BcryptHash';
import { IHash } from '../providers/hash/contract/IHash';
import { Customer } from '../domain/entities/Customer';
import { CreateCustomerDTO } from '../dto/CreateCustomerDTO';
import { TypeormCustomerRepository } from '../../../external/repositories/TypeormCustomerRepository';

export class CreateCustomerService {
  constructor(
    @Inject(TypeormCustomerRepository)
    private readonly customerRepository: ICustomerRepository,
    @Inject(BcryptHash) private readonly hashPassword: IHash,
  ) {}

  async execute({
    email,
    fullname,
    password,
  }: CreateCustomerDTO): Promise<Customer> {
    const customerExists =
      await this.customerRepository.findCustomerByEmail(email);

    if (customerExists) {
      throw new NotAcceptableException(
        'the email is already being used by another user',
      );
    }

    try {
      const cryptoPassword = await this.hashPassword.generatedHash(password);

      const staticCustomer: Customer = Customer.create({
        password: cryptoPassword,
        email,
        fullname,
        createdAt: new Date(),
      });

      const newCustomer = await this.customerRepository.create(staticCustomer);

      await this.customerRepository.saveCustomer(newCustomer);

      return newCustomer;
    } catch (error) {
      console.error('Error creating customer:', error);
      throw new Error(
        'An unexpected error occurred while creating the customer',
      );
    }
  }
}
