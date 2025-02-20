import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Param,
  Post,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateContactService } from '../../services/CreateContact.service';
import { CreateContactDTO } from '../../dto/CreateContactDTO';
import { Contact } from '../../domain/entities/Contact';

@Controller('api/contact')
export class ContactController {
  constructor(private createContactService: CreateContactService) {}

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
}
