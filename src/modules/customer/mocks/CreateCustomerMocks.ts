export const createCustomerMocks = {
  create: jest.fn(),
  findCustomerByEmail: jest.fn(),
  saveCustomer: jest.fn(),
  returnCustomerById: jest.fn(),
};

export const hashPasswordMockup = {
  generatedHash: jest.fn().mockResolvedValue('$2b$08$fakehash'),
};
