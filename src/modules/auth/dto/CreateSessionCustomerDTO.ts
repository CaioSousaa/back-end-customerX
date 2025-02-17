import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateSessionCustomerDTO {
  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;
}
