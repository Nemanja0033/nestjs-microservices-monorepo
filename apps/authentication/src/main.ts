import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AuthenticationModule } from './authentication.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { microservicesConfig } from 'common/config/microservices-config';
import { ValidationPipe } from '@nestjs/common';

// * Create microservice for authentication, configure transport type and auth service options
// * Use global validation pipe
async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AuthenticationModule,
    {
      transport: Transport.TCP,
      options: microservicesConfig.authService.options
    }
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true
    })
  );

  await app.listen();
}
bootstrap();
