import { Customer } from '../domain/entities/Customer';

export interface ICustomerRepository {
  create(customer: Customer): Promise<Customer>;
  findCustomerByEmail(email: string): Promise<boolean>;
  saveCustomer(customer: Customer): Promise<void>;
}
