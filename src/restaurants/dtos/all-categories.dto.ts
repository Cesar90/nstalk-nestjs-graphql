import { Field, ObjectType } from '@nestjs/graphql';
import { Category } from '../entities/category.entity';
import { CommonDtoOuput } from './../../common/dtos/output.dto';

@ObjectType()
export class AllCategoriesOutput extends CommonDtoOuput{
  @Field(type => [Category],{nullable:true})
  categories?: Category[]
}