import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateCustomerService } from '../../services/CreateCustomer.service';
import { CreateCustomerDTO } from '../../dto/CreateCustomerDTO';
import { Customer } from '../../domain/entities/Customer';

@Controller('api/customer')
export class CustomerController {
  constructor(private createCustomerService: CreateCustomerService) {}

  @Post()
  @UsePipes(ValidationPipe)
  @UseInterceptors(ClassSerializerInterceptor)
  async create(
    @Body() customerRequestDTO: CreateCustomerDTO,
  ): Promise<Customer> {
    const customer = this.createCustomerService.execute(customerRequestDTO);

    return customer;
  }
}
