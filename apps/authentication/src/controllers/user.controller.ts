import { Controller } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { MessagePattern } from '@nestjs/microservices';
import { MessagePatterns } from 'common/core/constants/message-patterns';
import { RegisterUserDto } from 'common/core/dtos/register-user-dto';

// * User controller listening for message from gateway app and handling bussines logic encapsulated in UserService.
// * UserController could be bad naming convetion beacuse we are in authentication module. In larger app we sholud isolate this into separate Module or even app.
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern(MessagePatterns.USER_REGISTER)
  async register(registerUserDto: RegisterUserDto) {
    return this.userService.register(registerUserDto);
  }

  @MessagePattern(MessagePatterns.USER_GET_ALL)
  async getAllUsers(){
    return this.userService.getAllUsers();
  }
}
