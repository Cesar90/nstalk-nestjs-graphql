import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { User } from '../entities/user.entity';
import { CommonDtoOuput } from './../../common/dtos/output.dto';

@InputType()
export class LoginInput extends PickType(User,["email","password"]){

}

@ObjectType()
export class LoginOutput extends CommonDtoOuput{
  @Field(type => String,{nullable: true})
  token?: string;
}