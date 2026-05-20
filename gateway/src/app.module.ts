import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UsersController } from './user/user.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USER_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:3001'],
          queue: 'user_queue',
        },
      },
    ]),
  ],
  controllers: [AppController, UsersController],
  providers: [AppService],
})
export class AppModule { }
