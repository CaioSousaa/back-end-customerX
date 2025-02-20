import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateContactService } from '../../services/CreateContact.service';
import { CreateContactDTO } from '../../dto/CreateContactDTO';
import { Contact } from '../../domain/entities/Contact';
import { FindManyContactsOfTheCustomerService } from '../../services/FindManyContactsOfTheCustomer.service';

@Controller('api/contact')
export class ContactController {
  constructor(
    private createContactService: CreateContactService,
    private findManyContactsOhTheCustomer: FindManyContactsOfTheCustomerService,
  ) {}

  @Post(':id')
  @UsePipes(ValidationPipe)
  @UseInterceptors(ClassSerializerInterceptor)
  async create(
    @Body() requestDTO: CreateContactDTO,
    @Param('id') customerId: string,
  ): Promise<Contact> {
    const contact = await this.createContactService.execute(
      requestDTO,
      customerId,
    );

    return contact;
  }

  @Get('many/:id')
  async getMany(@Param('id') customerId: string): Promise<Contact[]> {
    const contacts =
      await this.findManyContactsOhTheCustomer.execute(customerId);

    return contacts;
  }
}
