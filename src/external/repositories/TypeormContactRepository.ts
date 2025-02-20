import { Inject } from '@nestjs/common';
import { Contact } from 'src/modules/contact/domain/entities/Contact';
import { IContactRepository } from 'src/modules/contact/port/IContactsRepository';
import { Repository } from 'typeorm';

export class TypeormContactRepository implements IContactRepository {
  constructor(
    @Inject('CONTACT_REPOSITORY')
    private contactRepository: Repository<Contact>,
  ) {}

  async create({
    customer,
    email,
    firstName,
    lastName,
    numberPhone,
  }: Contact): Promise<Contact> {
    const newContact = this.contactRepository.create({
      createdAt: new Date(),
      customer,
      email,
      firstName,
      lastName,
      numberPhone,
    });

    return newContact;
  }

  async save(contact: Contact): Promise<void> {
    await this.contactRepository.save(contact);
  }

  async emailOrNumberPhoneExists(
    numberPhone: number,
    email: string,
  ): Promise<boolean> {
    const numberPhoneExists = await this.contactRepository.findOneBy({
      numberPhone,
    });

    const emailExists = await this.contactRepository.findOneBy({
      email,
    });

    return !!(numberPhoneExists || emailExists);
  }

  async findManyContacts(customerId: string): Promise<Contact[]> {
    return await this.contactRepository.find({
      where: { customer: { id: customerId } },
    });
  }

  async findContact(numberPhone: number): Promise<Contact> {
    const contact = await this.contactRepository.findOneByOrFail({
      numberPhone,
    });

    return contact;
  }
}
