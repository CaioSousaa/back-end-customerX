import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateContactDTO {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(10000000000)
  @Max(99999999999)
  numberPhone: number;

  @IsEmail()
  @IsNotEmpty()
  email: string;
}
