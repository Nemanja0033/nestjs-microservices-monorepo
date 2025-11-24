import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { RegisterUserDto } from "common/core/dtos/register-user-dto";
import { User, UserDocument } from "../schema/user.schema";

// * UserRepository containing methods to interact with data base, this repository will be used in UserService for handling bussines logic.
// * InjectModel allows us to interact with MongoDB collections.
@Injectable()
export class UserRepository {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>){}

    async create(registerUserDto: RegisterUserDto): Promise<UserDocument> {
        const newUser = new this.userModel(registerUserDto);
        return newUser.save();
    }

    async findAll(): Promise<UserDocument[]>{
        return this.userModel.find().exec();
    }

    async findByEmail(email: string): Promise<UserDocument | null>{
        return this.userModel.findOne({ email }).exec();
    }

    async findByUsername(username: string): Promise<UserDocument | null>{
        return this.userModel.findOne({ username });
    }
}