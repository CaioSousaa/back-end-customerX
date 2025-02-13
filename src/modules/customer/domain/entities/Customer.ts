import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class Customer {
  id?: string;

  @IsString()
  @IsNotEmpty()
  fullname: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
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
