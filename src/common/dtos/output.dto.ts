import { Field, InputType, ObjectType, PickType } from "@nestjs/graphql";

@ObjectType()
export class CommonDtoOuput{
  @Field(type=>String, { nullable:true})
  error?: string;

  @Field(type=>Boolean)
  ok: boolean;
}