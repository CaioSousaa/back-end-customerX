import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateCustomerService } from '../../services/create-customer.service';
import { ICreateCustomerDTO } from '../../dto/ICreateCustomerDTO';
import { Customer } from '../../domain/entities/Customer';

@Controller('api/customer')
export class CustomerController {
  constructor(private createCustomerService: CreateCustomerService) {}

  @Post()
  @UsePipes(ValidationPipe)
  @UseInterceptors(ClassSerializerInterceptor)
  async create(
    @Body() customerRequestDTO: ICreateCustomerDTO,
  ): Promise<Customer> {
    const customer = this.createCustomerService.execute(customerRequestDTO);

    return customer;
  }
}
