import { Module } from '@nestjs/common';
import { BcryptHashPassword } from './providers/hash/implementations/BcryptHash';
import { CreateSessionCustomerController } from './infra/http/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { secret, expiresIn } from '../../external/config/jwt/config.jwt';
import { CreateSessionCustomerService } from './services/CreateSessionCustomer.service';
import { TypeormCustomerRepository } from 'src/external/repositories/TypeormCustomerRepository';
import { customerProvider } from '../customer/customer.provider';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [
    JwtModule.register({
      secret: secret,
      signOptions: { expiresIn: expiresIn },
    }),
    DatabaseModule,
  ],
  controllers: [CreateSessionCustomerController],
  providers: [
    BcryptHashPassword,
    CreateSessionCustomerService,
    TypeormCustomerRepository,
    ...customerProvider,
  ],
})
export class AuthModule {}
