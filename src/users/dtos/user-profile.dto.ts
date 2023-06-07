import { ArgsType, Field, Int, ObjectType } from "@nestjs/graphql";
import { CommonDtoOuput } from "../../common/dtos/output.dto";
import { User } from "../entities/user.entity";

@ArgsType()
export class UserProfileInput{
  @Field(type=>Number)
  userId:number;
}

@ObjectType()
export class UserProfileOutput extends CommonDtoOuput{
  @Field(type=>User,{nullable:true})
  user?: User
}