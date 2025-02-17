import { Customer } from '../domain/entities/Customer';

export interface ICustomerRepository {
  create(customer: Customer): Promise<Customer>;
  findCustomerByEmail(email: string): Promise<boolean>;
  returnCustomerByEmail(email: string): Promise<Customer | null>;
  saveCustomer(customer: Customer): Promise<void>;
}
