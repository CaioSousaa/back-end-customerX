import { Inject, Injectable } from '@nestjs/common';
import { IContactRepository } from '../port/IContactsRepository';
import { TypeormContactRepository } from '../../../external/repositories/TypeormContactRepository';
import { Contact } from '../domain/entities/Contact';

@Injectable()
export class FindManyContactsOfTheCustomerService {
  constructor(
    @Inject(TypeormContactRepository)
    private contactRepository: IContactRepository,
  ) {}

  async execute(customerId: string): Promise<Contact[]> {
    const contacts = await this.contactRepository.findManyContacts(customerId);

    return contacts;
  }
}
