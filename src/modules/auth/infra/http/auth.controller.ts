import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { CreateSessionCustomerDTO } from '../../dto/CreateSessionCustomerDTO';
import { CreateSessionCustomerService } from '../../services/CreateSessionCustomer.service';

@Controller('api/authentiacte')
export class CreateSessionCustomerController {
  constructor(
    private readonly createSessionService: CreateSessionCustomerService,
  ) {}

  @Post()
  @UsePipes(ValidationPipe)
  @UseInterceptors(ClassSerializerInterceptor)
  public async createSession(
    @Body() { email, password }: CreateSessionCustomerDTO,
  ): Promise<{ token: string }> {
    return this.createSessionService.execute({ email, password });
  }
}
