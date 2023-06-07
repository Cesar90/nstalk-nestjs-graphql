import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { CommonDtoOuput } from './../../common/dtos/output.dto';

@InputType()
export class DeleteDishInput {
  @Field(type => Int)
  dishId: number;
}

@ObjectType()
export class DeleteDishOutput extends CommonDtoOuput {}