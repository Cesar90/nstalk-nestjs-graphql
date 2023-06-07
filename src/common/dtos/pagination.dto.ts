import { CommonDtoOuput } from './output.dto';
import { Field, InputType, Int, ObjectType } from "@nestjs/graphql";

@InputType()
export class PaginationInput{
  @Field(type => Int, { defaultValue: 1 })
  page: number
}

@ObjectType()
export class PaginationOutput extends CommonDtoOuput{
  @Field(type => Int, { nullable: true })
  totalPages?: number;

  @Field(type => Int, { nullable: true })
  totalResults?: number;
}