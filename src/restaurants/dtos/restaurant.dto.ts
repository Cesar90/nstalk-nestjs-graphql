import { CommonDtoOuput } from './../../common/dtos/output.dto';
import { Field, InputType, Int, ObjectType } from "@nestjs/graphql";
import { Restaurant } from '../entities/restaurant.entity';

@InputType()
export class RestaurantInput{
  @Field(type => Int)
  restaurantId: number;
}

@ObjectType()
export class RestaurantOutput extends CommonDtoOuput{
  @Field(type => Restaurant, { nullable: true })
  restaurant?: Restaurant
}