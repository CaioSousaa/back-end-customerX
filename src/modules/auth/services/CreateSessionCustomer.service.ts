import {
  Inject,
  NotAcceptableException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeormCustomerRepository } from 'src/external/repositories/TypeormCustomerRepository';
import { ICustomerRepository } from 'src/modules/customer/port/ICustomerRepository';
import { BcryptHashPassword } from '../providers/hash/implementations/BcryptHash';
import { IHashPasswordContract } from '../providers/hash/contract/IHash';
import { CreateSessionCustomerDTO } from '../dto/CreateSessionCustomerDTO';

export class CreateSessionCustomerService {
  constructor(
    @Inject(TypeormCustomerRepository)
    private customerRepository: ICustomerRepository,
    private jwtService: JwtService,
    @Inject(BcryptHashPassword) private hash: IHashPasswordContract,
  ) {}

  async execute({
    email,
    password,
  }: CreateSessionCustomerDTO): Promise<{ token: string }> {
    try {
      const customer =
        await this.customerRepository.returnCustomerByEmail(email);

      if (!customer) {
        throw new NotAcceptableException('this email or password incorrect');
      }

      const verifyCombineCustomerPassword: boolean =
        await this.hash.compareHash(password, customer.password);

      if (!verifyCombineCustomerPassword) {
        throw new UnauthorizedException(
          'the password passed does not match the user',
        );
      }

      const token = this.jwtService.sign({
        id: customer.id,
        fullname: customer.fullname,
        email: customer.email,
      });

      return { token };
    } catch (error) {
      console.error('Error creating customer:', error);
      throw new Error(
        'An unexpected error occurred while creating the customer',
      );
    }
  }
}
