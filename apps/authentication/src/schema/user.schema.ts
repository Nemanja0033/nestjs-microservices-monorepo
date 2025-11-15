import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

// * Mongoose schema for declaring models for data.
export type UserDocument = User & Document;

@Schema({ timestamps: true, id: true })
export class User{
    @Prop({ required: true, unique: true })
    username: string;

    @Prop({ required: true, unique: true })
    email: string

    @Prop({ required: true })
    password: string
}

export const UserSchema = SchemaFactory.createForClass(User);