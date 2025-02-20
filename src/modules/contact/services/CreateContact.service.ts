import {
  Inject,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { TypeormContactRepository } from '../../../external/repositories/TypeormContactRepository';
import { IContactRepository } from '../port/IContactsRepository';
import { TypeormCustomerRepository } from '../../../external/repositories/TypeormCustomerRepository';
import { ICustomerRepository } from '../../customer/port/ICustomerRepository';
import { Contact } from '../domain/entities/Contact';
import { CreateContactDTO } from '../dto/CreateContactDTO';

@Injectable()
export class CreateContactService {
  constructor(
    @Inject(TypeormContactRepository)
    private readonly contactRepository: IContactRepository,
    @Inject(TypeormCustomerRepository)
    private readonly customerRepository: ICustomerRepository,
  ) {}

  async execute(
    { email, firstName, lastName, numberPhone }: CreateContactDTO,
    customerId: string,
  ): Promise<Contact> {
    if (!customerId) {
      throw new NotAcceptableException('customerId not received');
    }

    const customerExists =
      await this.customerRepository.returnCustomerById(customerId);

    if (!customerExists) {
      throw new NotFoundException('invalid customer id');
    }

    const emailOrNumberPhoneAlreadyExists =
      await this.contactRepository.emailOrNumberPhoneExists(numberPhone, email);

    if (emailOrNumberPhoneAlreadyExists) {
      throw new NotAcceptableException(
        'email or number phone has already been registered in another contact',
      );
    }

    try {
      const staticContact: Contact = Contact.create({
        createdAt: new Date(),
        customer: customerExists,
        email,
        firstName,
        lastName,
        numberPhone,
      });

      const newContact = await this.contactRepository.create(staticContact);
      await this.contactRepository.save(newContact);

      return newContact;
    } catch (err) {
      console.error(err);
      throw new Error(
        'An unexpected error occurred while creating the contact',
      );
    }
  }
}
