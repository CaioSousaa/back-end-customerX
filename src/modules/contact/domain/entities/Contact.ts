import { Customer } from '../../../customer/domain/entities/Customer';

export class Contact {
  id?: string;
  firstName: string;
  lastName: string;
  numberPhone: number;
  email: string;
  createdAt: Date;
  customer: Customer;

  constructor({
    firstName,
    lastName,
    numberPhone,
    email,
    customer,
    createdAt,
  }: Contact) {
    Object.assign(this, {
      firstName,
      lastName,
      numberPhone,
      email,
      customer,
      createdAt,
    });
  }

  static create({
    firstName,
    lastName,
    numberPhone,
    email,
    customer,
  }: Contact) {
    const contact = new Contact({
      firstName,
      lastName,
      numberPhone,
      email,
      customer,
      createdAt: new Date(),
    });

    return contact;
  }
}
