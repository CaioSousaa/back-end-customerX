import { Test, TestingModule } from '@nestjs/testing';
import { FindManyContactsOfTheCustomerService } from './FindManyContactsOfTheCustomer.service';
import { TypeormContactRepository } from '../../../external/repositories/TypeormContactRepository';
import { findManyContactsOfTheCustomerMocks } from '../mocks/FindManyContactsOfTheCustomerMocks';
import { Customer } from '../../customer/domain/entities/Customer';

describe('find_many_contacts_of_the_customer', () => {
  let findManyContactsOfTheCustomer: FindManyContactsOfTheCustomerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindManyContactsOfTheCustomerService,
        {
          provide: TypeormContactRepository,
          useValue: findManyContactsOfTheCustomerMocks,
        },
      ],
    }).compile();

    findManyContactsOfTheCustomer =
      module.get<FindManyContactsOfTheCustomerService>(
        FindManyContactsOfTheCustomerService,
      );
  });

  afterEach(async () => {
    jest.clearAllMocks();
  });

  it('it must be possible to have a well-defined service', async () => {
    expect(findManyContactsOfTheCustomer).toBeDefined();
  });

  it('it must be possible to return all contact details of a customer', async () => {
    const customer: Customer = {
      id: '64282815-b4eb-4a2b-a2f4-0c2689e380a4',
      fullname: 'John Doe Silva',
      email: 'fakeemail@gmail.com',
      password: '$2b$08$4Qh1AkqQFOudtmhxwP93Ke7O63zpAoBSytMyjMBCK.Du//fk3YUxW',
      createdAt: new Date(),
    };

    const contactsMock = [
      {
        id: '64282815-b4eb-4a2b-a2f4-0c2689e380a4',
        firstName: 'John',
        lastName: 'Doe',
        customer: customer,
        email: 'johndoe@gmail.com',
        numberPhone: 88933333333,
        createdAt: new Date(),
      },

      {
        id: '64822815-b4eb-4a2b-a2f4-0c2689e380a4',
        firstName: 'Fake',
        lastName: 'Name',
        customer: customer,
        email: 'fakeemail@gmail.com',
        numberPhone: 88944444444,
        createdAt: new Date(),
      },
    ];

    findManyContactsOfTheCustomerMocks.findManyContacts.mockReturnValue(
      Promise.resolve(contactsMock),
    );

    const response = await findManyContactsOfTheCustomer.execute(
      '64822815-b4eb-4a2b-a2f4-0c2689e380a4',
    );

    expect(response.length).toBe(2);
    expect(response[0]).toHaveProperty('id');
    expect(response[0]).toHaveProperty('firstName');
    expect(response[0]).toHaveProperty('lastName');
    expect(response[0]).toHaveProperty('customer');
    expect(response[0]).toHaveProperty('customer.id');
    expect(response[0]).toHaveProperty('email');
    expect(response[0]).toHaveProperty('numberPhone');
    expect(response[0]).toHaveProperty('createdAt');

    expect(response[1]).toHaveProperty('id');
    expect(response[1]).toHaveProperty('firstName');
    expect(response[1]).toHaveProperty('lastName');
    expect(response[1]).toHaveProperty('customer');
    expect(response[1]).toHaveProperty('customer.id');
    expect(response[1]).toHaveProperty('email');
    expect(response[1]).toHaveProperty('numberPhone');
    expect(response[1]).toHaveProperty('createdAt');

    expect(
      findManyContactsOfTheCustomerMocks.findManyContacts,
    ).toHaveBeenCalled();
  });

  it('it must be possible to return the contact details of only the specific customer', async () => {
    const customer: Customer = {
      id: '64282815-b4eb-4a2b-a2f4-0c2689e380a4',
      fullname: 'John Doe Silva',
      email: 'jonhdoe@gmail.com',
      password: '$2b$08$4Qh1AkqQFOudtmhxwP93Ke7O63zpAoBSytMyjMBCK.Du//fk3YUxW',
      createdAt: new Date(),
    };

    const otherCustomer: Customer = {
      id: '73282816-b4eb-4a2b-a2f4-0c2689e380a4',
      fullname: 'Fake Name',
      email: 'fakeemail@gmail.com',
      password: '$2c$18$4Qh1AkqJKOudtmhxwP93Ke7O63zpAoBSytMyjMBCK.Du//fk3YUxW',
      createdAt: new Date(),
    };

    const contactsMock = [
      {
        id: '64282815-b4eb-4a2b-a2f4-0c2689e380a4',
        firstName: 'John',
        lastName: 'Doe',
        customer: customer,
        email: 'jonhdoe@gmail.com',
        numberPhone: 88933333333,
        createdAt: new Date(),
      },

      {
        id: '64822815-b4eb-4a2b-a2f4-0c2689e380a4',
        firstName: 'Fake',
        lastName: 'Name',
        customer: customer,
        email: 'jonhdoe@gmail.com',
        numberPhone: 88944444444,
        createdAt: new Date(),
      },
      {
        id: '92200815-b4eb-4a2b-a2f4-0c2689e380a4',
        firstName: 'Bird',
        lastName: 'Blue',
        customer: otherCustomer,
        email: 'birdblue@gmail.com',
        numberPhone: 88933333333,
        createdAt: new Date(),
      },

      {
        id: '81822815-b4eb-4a2b-a2f4-0c2689e380a4',
        firstName: 'Red',
        lastName: 'Dog',
        customer: otherCustomer,
        email: 'reddog@gmail.com',
        numberPhone: 88944444444,
        createdAt: new Date(),
      },
    ];

    findManyContactsOfTheCustomerMocks.findManyContacts.mockImplementation(
      async (customerId) =>
        contactsMock.filter((contact) => contact.customer.id === customerId),
    );

    const response = await findManyContactsOfTheCustomer.execute(
      '64282815-b4eb-4a2b-a2f4-0c2689e380a4',
    );

    expect(response.length).toBe(2);
  });
});
