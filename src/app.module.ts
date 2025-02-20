import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { CustomerModule } from './modules/customer/customer.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ContactModule } from './modules/contact/contacts.module';
import { EnsureAuthenticateMidllwware } from './shared/http/middleware/ensure-authenticate-middleware';

@Module({
  imports: [
    DatabaseModule,
    CustomerModule,
    AuthModule,
    ContactModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(EnsureAuthenticateMidllwware)
      .exclude(
        { path: 'api/customer', method: RequestMethod.POST },
        { path: 'api/authenticate', method: RequestMethod.POST },
        { path: 'api/contact/many/:customerId', method: RequestMethod.GET },
      )
      .forRoutes('*');
  }
}
