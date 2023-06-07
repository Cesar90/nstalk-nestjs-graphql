import { Field, ObjectType } from '@nestjs/graphql';
import { CommonDtoOuput } from './../../common/dtos/output.dto';
import { Restaurant } from '../entities/restaurant.entity';

@ObjectType()
export class MyRestaurantsOutput extends CommonDtoOuput {
  @Field(type => [Restaurant])
  restaurants?: Restaurant[];
}