import { Contact } from '../domain/entities/Contact';

export interface IContactRepository {
  create(contact: Contact): Promise<Contact>;
  save(contact: Contact): Promise<void>;
  emailOrNumberPhoneExists(
    numberPhone: number,
    email: string,
  ): Promise<boolean>;
  findManyContacts(customerId: string): Promise<Contact[]>;
  findContact(numberPhone: number): Promise<Contact>;
}
