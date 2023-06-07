import { InputType, ObjectType, PartialType, PickType } from '@nestjs/graphql';
import { CommonDtoOuput } from './../../common/dtos/output.dto';
import { User } from '../entities/user.entity';

@ObjectType()
export class EditProfileOutput extends CommonDtoOuput{

}

@InputType()
export class EditProfileInput extends PartialType(PickType(User,['email','password'])){

}