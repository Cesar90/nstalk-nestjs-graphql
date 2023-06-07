import { CommonDtoOuput } from './../../common/dtos/output.dto';
import { ArgsType, Field, InputType, ObjectType } from "@nestjs/graphql";
import { Category } from '../entities/category.entity';
import { PaginationInput, PaginationOutput } from '../../common/dtos/pagination.dto';
import { Restaurant } from '../entities/restaurant.entity';

// @ArgsType()
@InputType()
export class CategoryInput extends PaginationInput{
  @Field(type => String)
  slug: string;
}

@ObjectType()
export class CategoryOutput extends PaginationOutput{
  @Field(type => [Restaurant], { nullable: true })
  restaurants?: Restaurant[];
  
  @Field(type => Category, {nullable: true})
  category?: Category
}