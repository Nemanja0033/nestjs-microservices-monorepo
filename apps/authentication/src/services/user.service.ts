import { Injectable } from "@nestjs/common";
import { UserRepository } from "../repositories/user.repository";
import { RegisterUserDto } from "common/core/dtos/register-user-dto";
import { UserResponseDto } from "common/core/dtos/user-response-dto";
import { RpcException } from "@nestjs/microservices";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService{
    constructor(private readonly userRepository: UserRepository) {}

    async register(registerUserDto: RegisterUserDto): Promise<UserResponseDto>{
        const existingUserByEmail = await this.userRepository.findByEmail(registerUserDto.email);

        if(existingUserByEmail){
            // In microservices RcpException is used to handle and throw exceptions.
            throw new RpcException({ status: 409, message: `Email ${registerUserDto.email} already exist`});
        }

        const existingUserByUsername = await this.userRepository.findByUsername(registerUserDto.username);

        if(existingUserByUsername){
            throw new RpcException({ status: 409, message: `Username ${registerUserDto.username} already exist`});
        }

        const hashedPassword = await bcrypt.hash(registerUserDto.password, 10);
        const userWithHashedPassword = {
            ...registerUserDto,
            password: hashedPassword
        };

        const user = await this.userRepository.create(userWithHashedPassword);

        // Casting user as any just for task showcase, would not use this in production.
        return {
            id: (user as any)._id.toString(),
            username: user.username,
            email: user.email,
            createdAt: (user as any).createdAt,
        };

    }

    async getAllUsers(): Promise<UserResponseDto[]> {
        try {
            const users = await this.userRepository.findAll();

            return users.map((user) => ({
                id: (user as any)._id.toString(),
                username: user.username,
                email: user.email,
                createdAt: (user as any).createdAt,
            }));
        } catch (error) {
            console.error('getAllUsers error:', error);
            throw new RpcException({ status: 500, message: 'Failed to fetch users' });
        }
    }
}