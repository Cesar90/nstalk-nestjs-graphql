import { CreateRestaurantInput } from './create-restaurant.dto';
import { ArgsType, Field, ID, InputType, ObjectType, OmitType, PartialType, PickType } from "@nestjs/graphql";
import { IsString , IsBoolean, Length, IsNotEmpty} from "class-validator";
import { CommonDtoOuput } from './../../common/dtos/output.dto';
import { Restaurant } from "../entities/restaurant.entity";

// @InputType()
// export class EditRestaurantInput extends PartialType(PickType(Restaurant,["address","name","coverImage"])){
//   @Field(type => String)
//   categoryName: string
// }

@InputType()
export class EditRestaurantInput extends PartialType(CreateRestaurantInput){
  @Field(type => ID)
  restaurantId: number;
}

@ObjectType()
export class EditRestaurantOutput extends CommonDtoOuput{

}