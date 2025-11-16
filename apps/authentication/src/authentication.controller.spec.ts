import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';

describe('AuthenticationController', () => {
  let authenticationController: UserController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    authenticationController = app.get<AuthenticationController>(AuthenticationController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(authenticationController.getHello()).toBe('Hello World!');
    });
  });
});
