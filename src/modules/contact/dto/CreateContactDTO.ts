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
  @Max(11)
  @Min(11)
  numberPhone: number;

  @IsEmail()
  @IsNotEmpty()
  email: string;
}
