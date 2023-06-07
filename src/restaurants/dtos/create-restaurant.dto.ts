import { ArgsType, Field, InputType, Int, ObjectType, OmitType, PickType } from "@nestjs/graphql";
import { IsString , IsBoolean, Length, IsNotEmpty} from "class-validator";
import { CommonDtoOuput } from './../../common/dtos/output.dto';
import { Restaurant } from "../entities/restaurant.entity";

// @ArgsType()
@InputType()
// export class CreateRestaurantInput extends OmitType(Restaurant,["id","category","owner"]){
export class CreateRestaurantInput extends PickType(Restaurant,["name","coverImage","address"]){
  @Field(type => String)
  @IsString()
  @IsNotEmpty()
  categoryName: string;
  // @Field(type => String)
  // @IsString()
  // @Length(5,10)
  // name:string;

  // @Field(type => Boolean)
  // @IsBoolean()
  // isVegan:boolean;

  // @Field(type => String)
  // @IsString()
  // address:string;

  // @Field(type => String)
  // @IsString()
  // ownerName:string;

  // @Field(type => String)
  // @IsString()
  // categoryName:string;
}

@ObjectType()
export class CreateRestauranOutput extends CommonDtoOuput{
  @Field(type => Int)
  restaurantId?: number;
}