import { Field, InputType, Int, ObjectType } from "@nestjs/graphql";
import { IsBoolean, IsOptional, IsString, Length } from "class-validator";
import { CoreEntity } from "../../common/entities/core.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Restaurant } from "./restaurant.entity";

// @InputType({ isAbstract: true })
@InputType('CategoryInputType',{ isAbstract: true }) //Avoid conflict with name in schema
@ObjectType()
@Entity()
export class Category extends CoreEntity{
  @Field(type => String)
  @Column()
  @IsString()
  @Length(5)
  name: string;
  
  @Field(type => String, { nullable: true })
  @Column({nullable:true})
  @IsString()
  coverImage: string;

  @Field(type => String)
  @Column({ unique:true })
  @IsString()
  slug: string;

  @Field(type => [Restaurant], { nullable: true })
  @OneToMany(
    type => Restaurant,
    restaurant => restaurant.category
  )
  restaurants: Restaurant[];

}