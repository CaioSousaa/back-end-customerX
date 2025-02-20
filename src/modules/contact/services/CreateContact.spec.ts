import { Test, TestingModule } from '@nestjs/testing';
import { CreateContactService } from './CreateContact.service';
import { TypeormContactRepository } from '../../../external/repositories/TypeormContactRepository';
import { TypeormCustomerRepository } from '../../../external/repositories/TypeormCustomerRepository';
import { createContactMocks } from '../mocks/CreateContactMocks';
import { createCustomerMocks } from '../../customer/mocks/CreateCustomerMocks';
import { Customer } from 'src/modules/customer/domain/entities/Customer';
import { Contact } from '../domain/entities/Contact';
import { NotAcceptableException } from '@nestjs/common';

describe('create_contact', () => {
  let createContactService: CreateContactService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateContactService,
        {
          provide: TypeormContactRepository,
          useValue: createContactMocks,
        },
        {
          provide: TypeormCustomerRepository,
          useValue: createCustomerMocks,
        },
      ],
    }).compile();

    createContactService =
      module.get<CreateContactService>(CreateContactService);
  });

  afterEach(async () => {
    jest.clearAllMocks();
  });

  it('should be able to create a well-defined contact', async () => {
    expect(createContactService).toBeDefined();
  });

  it('it must be possible to create a new contact with all the data filled in correctly', async () => {
    const customer: Customer = {
      id: '64282815-b4eb-4a2b-a2f4-0c2689e380a4',
      fullname: 'John Doe Silva',
      email: 'fakeemail@gmail.com',
      password: '$2b$08$4Qh1AkqQFOudtmhxwP93Ke7O63zpAoBSytMyjMBCK.Du//fk3YUxW',
      createdAt: new Date(),
    };

    const createContactInputMock: Omit<Contact, 'id' | 'createdAt'> = {
      firstName: 'John',
      lastName: 'Doe',
      customer: customer,
      email: 'johndoe@gmail.com',
      numberPhone: 88933333333,
    };

    const createContactOutputMock: Contact = {
      id: '64282815-b4eb-4a2b-a2f4-0c2689e380a4',
      firstName: 'John',
      lastName: 'Doe',
      customer: customer,
      email: 'johndoe@gmail.com',
      numberPhone: 88933333333,
      createdAt: new Date(),
    };

    createContactMocks.create.mockReturnValue(
      Promise.resolve(createContactOutputMock),
    );

    createContactMocks.save.mockReturnValue(
      Promise.resolve(createContactOutputMock),
    );

    createCustomerMocks.returnCustomerById.mockReturnValue(
      Promise.resolve(customer),
    );

    const response = await createContactService.execute(
      {
        email: createContactInputMock.email,
        firstName: createContactInputMock.firstName,
        lastName: createContactInputMock.lastName,
        numberPhone: createContactInputMock.numberPhone,
      },
      '64282815-b4eb-4a2b-a2f4-0c2689e380a4',
    );

    expect(response).toEqual(createContactOutputMock);
    expect(response).toHaveProperty('id');
    expect(response).toHaveProperty('firstName');
    expect(response).toHaveProperty('lastName');
    expect(response).toHaveProperty('numberPhone');
    expect(response).toHaveProperty('customer');
    expect(response).toHaveProperty('customer.email');
    expect(response).toHaveProperty('customer.fullname');
    expect(response).toHaveProperty('customer.id');
    expect(response).toHaveProperty('customer.password');
    expect(response).toHaveProperty('customer.createdAt');

    expect(response.customer).toBe(customer);
    expect(response.firstName).toBe('John');
    expect(response.lastName).toBe('Doe');
    expect(response.numberPhone).toBe(88933333333);
    expect(response.email).toBe('johndoe@gmail.com');

    expect(createContactMocks.create).toHaveBeenCalled();
    expect(createContactMocks.save).toHaveBeenCalled();
    expect(createContactMocks.emailOrNumberPhoneExists).toHaveBeenCalledTimes(
      1,
    );
    expect(createCustomerMocks.returnCustomerById).toHaveBeenCalled();
  });

  it('it should not be possible to create a contact with an email that has already been registered', async () => {
    const customer: Customer = {
      id: '64282815-b4eb-4a2b-a2f4-0c2689e380a4',
      fullname: 'John Doe Silva',
      email: 'fakeemail@gmail.com',
      password: '$2b$08$4Qh1AkqQFOudtmhxwP93Ke7O63zpAoBSytMyjMBCK.Du//fk3YUxW',
      createdAt: new Date(),
    };

    const createContactInputMock: Omit<Contact, 'id' | 'createdAt'> = {
      firstName: 'John',
      lastName: 'Doe',
      customer: customer,
      email: 'johndoe@gmail.com',
      numberPhone: 88933333333,
    };

    const createContactOutputMock: Contact = {
      id: '64282815-b4eb-4a2b-a2f4-0c2689e380a4',
      firstName: 'John',
      lastName: 'Doe',
      customer: customer,
      email: 'johndoe@gmail.com',
      numberPhone: 88933333333,
      createdAt: new Date(),
    };

    createContactMocks.emailOrNumberPhoneExists.mockReturnValue(
      Promise.resolve(createContactOutputMock),
    );

    expect(
      createContactService.execute(
        {
          email: createContactInputMock.email,
          firstName: createContactInputMock.firstName,
          lastName: createContactInputMock.lastName,
          numberPhone: 10111111111,
        },
        '64282815-b4eb-4a2b-a2f4-0c2689e380a4',
      ),
    ).rejects.toEqual(
      new NotAcceptableException(
        'email or number phone has already been registered in another contact',
      ),
    );

    expect(createContactMocks.create).not.toHaveBeenCalled();
    expect(createContactMocks.save).not.toHaveBeenCalled();
  });

  it('it should not be possible to create a contact with an numberPhone that has already been registered', async () => {
    const customer: Customer = {
      id: '64282815-b4eb-4a2b-a2f4-0c2689e380a4',
      fullname: 'John Doe Silva',
      email: 'fakeemail@gmail.com',
      password: '$2b$08$4Qh1AkqQFOudtmhxwP93Ke7O63zpAoBSytMyjMBCK.Du//fk3YUxW',
      createdAt: new Date(),
    };

    const createContactInputMock: Omit<Contact, 'id' | 'createdAt'> = {
      firstName: 'John',
      lastName: 'Doe',
      customer: customer,
      email: 'johndoe@gmail.com',
      numberPhone: 88933333333,
    };

    const createContactOutputMock: Contact = {
      id: '64282815-b4eb-4a2b-a2f4-0c2689e380a4',
      firstName: 'John',
      lastName: 'Doe',
      customer: customer,
      email: 'johndoe@gmail.com',
      numberPhone: 88933333333,
      createdAt: new Date(),
    };

    createContactMocks.emailOrNumberPhoneExists.mockReturnValue(
      Promise.resolve(createContactOutputMock),
    );

    expect(
      createContactService.execute(
        {
          email: 'fakeemail@gmail.com',
          firstName: createContactInputMock.firstName,
          lastName: createContactInputMock.lastName,
          numberPhone: createContactInputMock.numberPhone,
        },
        '64282815-b4eb-4a2b-a2f4-0c2689e380a4',
      ),
    ).rejects.toEqual(
      new NotAcceptableException(
        'email or number phone has already been registered in another contact',
      ),
    );

    expect(createContactMocks.create).not.toHaveBeenCalled();
    expect(createContactMocks.save).not.toHaveBeenCalled();
  });

  it('it should not be possible to create a contact with an invalid number', async () => {
    const customer: Customer = {
      id: '64282815-b4eb-4a2b-a2f4-0c2689e380a4',
      fullname: 'John Doe Silva',
      email: 'fakeemail@gmail.com',
      password: '$2b$08$4Qh1AkqQFOudtmhxwP93Ke7O63zpAoBSytMyjMBCK.Du//fk3YUxW',
      createdAt: new Date(),
    };

    const createContactOutputMock: Contact = {
      id: '64282815-b4eb-4a2b-a2f4-0c2689e380a4',
      firstName: 'John',
      lastName: 'Doe',
      customer: customer,
      email: 'johndoe@gmail.com',
      numberPhone: 889333333333333,
      createdAt: new Date(),
    };

    createContactMocks.create.mockReturnValue(
      Promise.resolve(createContactOutputMock),
    );

    expect(createContactMocks.create).not.toHaveBeenCalled();
    expect(createContactMocks.save).not.toHaveBeenCalled();
  });
});
