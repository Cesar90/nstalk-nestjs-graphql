import { Field, InputType, ObjectType, PickType } from "@nestjs/graphql";
import { CommonDtoOuput } from './../../common/dtos/output.dto';
import { User } from "../entities/user.entity";

@InputType()
export class CreateAccountInput extends PickType(User, ["email","password","role"]){

}

@ObjectType()
export class CreateAccountOutput extends CommonDtoOuput{
  @Field(type => User)
  user?: User;
}