import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CommonDtoOuput } from './../../common/dtos/output.dto';
import { Restaurant } from '../entities/restaurant.entity';

@InputType()
export class MyRestaurantInput extends PickType(Restaurant, ['id']) {}

@ObjectType()
export class MyRestaurantOutput extends CommonDtoOuput {
  @Field(type => Restaurant, { nullable: true })
  restaurant?: Restaurant;
}