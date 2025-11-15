import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { microservicesConfig } from 'config/microservices-config';

// Configuring the gateway module to connect with auth microservice via TCP.
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    ClientsModule.register([
      {
        name: "AUTH_SERVICE",
        transport: Transport.TCP,
        options: microservicesConfig.authService.options
      }
    ])
  ],
  controllers: [AppController],
})
export class AppModule {}
