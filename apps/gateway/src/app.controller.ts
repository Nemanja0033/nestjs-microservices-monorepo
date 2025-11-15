import { Body, Controller, Get, HttpException, HttpStatus, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { MessagePatterns } from 'common/core/constants/message-patterns';
import { RegisterUserDto } from 'common/core/dtos/register-user-dto';
import { firstValueFrom } from 'rxjs';

/* 
  1.
    * Define gateway controller, and establish communication with client via HTTP.
    * Allow communicaton between gateway and auth microservice via TCP.
    * Inject auth microservice trough ClientProxy
  
  2.
    * Use rxjs mehtod firstValueFrom to retrieve the data of the request in the form of a promise.
    * Handle route "auth/register" listen for POST HTTP method and send message to the auth microservice to process the bussines logic.  
    * Handle route "auth/users" listen for GET HTTP method and send message to the auth microservice to porcess the bussines logic.
*/

@Controller('auth')
export class AppController {
  constructor(@Inject('AUTH_SERVICE') private readonly authClient: ClientProxy) {}

  @Post('register')
  async register(@Body() registerUserDto: RegisterUserDto) {
    try{
      return await firstValueFrom(
        this.authClient.send(MessagePatterns.USER_REGISTER, registerUserDto)
      );
    }
    catch(error){
      throw new HttpException(
        error.message || 'Registration failed',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('users')
  async getAllUsers() {
    try {
      return await firstValueFrom(
        this.authClient.send(MessagePatterns.USER_GET_ALL, {}),
      );
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to fetch users',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
