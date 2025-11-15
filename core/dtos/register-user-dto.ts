import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

// * Declare a RegisterUserDto (Data-Transfer-Objects)
// * Implement data validation for each value using class-validator

export class RegisterUserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;
}
