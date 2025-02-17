export class Customer {
  id?: string;
  fullname: string;
  email: string;
  password: string;
  createdAt: Date;

  constructor({ createdAt, email, fullname, password }: Customer) {
    Object.assign(this, {
      createdAt,
      password,
      email,
      fullname,
    });
  }

  static create({ email, fullname, password }: Customer) {
    const customer = new Customer({
      email,
      password,
      fullname,
      createdAt: new Date(),
    });

    return customer;
  }
}
