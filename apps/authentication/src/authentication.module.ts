import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { databaseConfig } from 'common/config/db-config';
import { AuthenticationController } from './controllers/authentication.controller';
import { User, UserSchema } from './schema/user.Schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    MongooseModule.forRoot(databaseConfig.uri as string),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService],
})
export class AuthenticationModule {}
