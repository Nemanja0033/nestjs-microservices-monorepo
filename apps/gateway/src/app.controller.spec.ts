import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { of } from 'rxjs';
import { RegisterUserDto } from 'common/core/dtos/register-user-dto';
import { MessagePatterns } from 'common/core/constants/message-patterns';

describe('AppController', () => {
  let appController: AppController;
  let mockClientProxy: { send: jest.Mock };

  beforeEach(async () => {
    mockClientProxy = {
      send: jest.fn(),
    };

    // * Declare testing module for AppController, provide AUTH_SERVICE and the mockClientProxy
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: 'AUTH_SERVICE',
          useValue: mockClientProxy,
        },
      ],
    }).compile();

    appController = module.get<AppController>(AppController);
  });

  // * Test case for register method form controller.
  describe('register', () => {
    it('should send USER_REGISTER message and return result', async () => {
      const dto: RegisterUserDto = {
        email: 'test@test.com',
        username: 'tester',
        password: 'secret',
      };

      const expectedResponse = { id: '1', email: dto.email, username: dto.username };
      
      mockClientProxy.send.mockReturnValue(of(expectedResponse));

      const result = await appController.register(dto);

      expect(mockClientProxy.send).toHaveBeenCalledWith(
        MessagePatterns.USER_REGISTER,
        dto,
      );
      expect(result).toEqual(expectedResponse);
    });
  });

  describe('getAllUsers', () => {
    it('should send USER_GET_ALL message and return users', async () => {
      const expectedUsers = [
        { id: '1', email: 'a@b.com', username: 'alpha' },
        { id: '2', email: 'b@c.com', username: 'beta' },
      ];

      mockClientProxy.send.mockReturnValue(of(expectedUsers));

      const result = await appController.getAllUsers();

      expect(mockClientProxy.send).toHaveBeenCalledWith(
        MessagePatterns.USER_GET_ALL,
        {},
      );
      expect(result).toEqual(expectedUsers);
    });
  });
});
