import { CreateCustomerService } from './CreateCustomerService';
import { TypeormCustomerRepository } from '../../../external/repositories/TypeormCustomerRepository';
import { BcryptHash } from '../providers/hash/implementation/BcryptHash';
import { Test, TestingModule } from '@nestjs/testing';
import {
  createCustomerMocks,
  hashPasswordMockup,
} from '../mocks/CreateCustomerMocks';
import { Customer } from '../domain/entities/Customer';
import { NotAcceptableException } from '@nestjs/common';

describe('create_customer', () => {
  let createCustomerService: CreateCustomerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateCustomerService,
        {
          provide: TypeormCustomerRepository,
          useValue: createCustomerMocks,
        },
        {
          provide: BcryptHash,
          useValue: hashPasswordMockup,
        },
      ],
    }).compile();

    createCustomerService = module.get<CreateCustomerService>(
      CreateCustomerService,
    );
  });

  afterEach(async () => {
    jest.clearAllMocks();
  });

  it('should be able defined create user service', async () => {
    expect(createCustomerService).toBeDefined();
  });

  it('it must be possible to create a customer with valid data', async () => {
    const createCustomerInputMock: Omit<Customer, 'id' | 'createdAt'> = {
      fullname: 'John Doe Silva',
      email: 'fakeemail@gmail.com',
      password: '12345',
    };

    const createCustomerOutputMock: Customer = {
      id: '64282815-b4eb-4a2b-a2f4-0c2689e380a4',
      fullname: 'John Doe Silva',
      email: 'fakeemail@gmail.com',
      password: '$2b$08$4Qh1AkqQFOudtmhxwP93Ke7O63zpAoBSytMyjMBCK.Du//fk3YUxW',
      createdAt: new Date(),
    };

    createCustomerMocks.create.mockReturnValue(
      Promise.resolve(createCustomerOutputMock),
    );

    createCustomerMocks.saveCustomer.mockReturnValue(
      Promise.resolve(createCustomerOutputMock),
    );

    const response = await createCustomerService.execute({
      fullname: createCustomerInputMock.fullname,
      email: createCustomerInputMock.email,
      password: createCustomerInputMock.password,
    });

    expect(response).toEqual(createCustomerOutputMock);
    expect(response).toHaveProperty('id');
    expect(response).toHaveProperty('fullname');
    expect(response).toHaveProperty('password');
    expect(response).toHaveProperty('email');
    expect(response).toHaveProperty('createdAt');
    expect(response.id).toBe('64282815-b4eb-4a2b-a2f4-0c2689e380a4');
    expect(response.fullname).toBe('John Doe Silva');
    expect(response.email).toBe('fakeemail@gmail.com');
    expect(response.password).toBe(
      '$2b$08$4Qh1AkqQFOudtmhxwP93Ke7O63zpAoBSytMyjMBCK.Du//fk3YUxW',
    );
  });

  it('it must be possible to call all methods successfully', async () => {
    const createCustomerInputMock: Omit<Customer, 'id' | 'createdAt'> = {
      fullname: 'John Doe Silva',
      email: 'fakeemail@gmail.com',
      password: '12345',
    };

    const createCustomerOutputMock: Customer = {
      id: '64282815-b4eb-4a2b-a2f4-0c2689e380a4',
      fullname: 'John Doe Silva',
      email: 'fakeemail@gmail.com',
      password: '$2b$08$4Qh1AkqQFOudtmhxwP93Ke7O63zpAoBSytMyjMBCK.Du//fk3YUxW',
      createdAt: new Date(),
    };

    createCustomerMocks.findCustomerByEmail.mockResolvedValue(null);
    createCustomerMocks.create.mockResolvedValue(createCustomerOutputMock);
    createCustomerMocks.saveCustomer.mockResolvedValue(
      createCustomerOutputMock,
    );
    hashPasswordMockup.generatedHash.mockResolvedValue(
      '$2b$08$4Qh1AkqQFOudtmhxwP93Ke7O63zpAoBSytMyjMBCK.Du//fk3YUxW',
    );

    await createCustomerService.execute(createCustomerInputMock);

    expect(createCustomerMocks.findCustomerByEmail).toHaveBeenCalled();
    expect(createCustomerMocks.create).toHaveBeenCalled();
    expect(createCustomerMocks.saveCustomer).toHaveBeenCalled();
    expect(hashPasswordMockup.generatedHash).toHaveBeenCalledTimes(1);
  });

  it('it should not be possible to create a client with an email already registered', async () => {
    const createCustomerInputMock: Omit<Customer, 'id' | 'createdAt'> = {
      fullname: 'John Doe Silva',
      email: 'fakeemail@gmail.com',
      password: '12345',
    };

    const outputCreateUserMock: Customer = {
      id: '64282815-b4eb-4a2b-a2f4-0c2689e380a4',
      fullname: 'joh doe',
      email: 'john@gmail.com',
      password:
        "'$2b$08$4Qh1AkqQFOudtmhxwP93Ke7O63zpAoBSytMyjMBCK.Du//fk3YUxW'",
      createdAt: new Date(),
    };

    createCustomerMocks.findCustomerByEmail.mockReturnValue(
      Promise.resolve(outputCreateUserMock),
    );

    expect(
      createCustomerService.execute({
        fullname: createCustomerInputMock.fullname,
        email: createCustomerInputMock.email,
        password: createCustomerInputMock.password,
      }),
    ).rejects.toEqual(
      new NotAcceptableException(
        'the email is already being used by another user',
      ),
    );

    expect(createCustomerMocks.create).not.toHaveBeenCalled();
    expect(createCustomerMocks.findCustomerByEmail).toHaveBeenCalledTimes(1);
    expect(createCustomerMocks.saveCustomer).not.toHaveBeenCalled();
  });
});
