import { Field, InputType, Int, ObjectType } from "@nestjs/graphql";
import { IsBoolean, IsOptional, IsString, Length } from "class-validator";
import { CoreEntity } from "../../common/entities/core.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, RelationId } from "typeorm";
import { Category } from "./category.entity";
import { User } from "../../users/entities/user.entity";
import { Dish } from "./dish.entity";

// @InputType({ isAbstract: true })
@InputType("RestaurantInputType", { isAbstract: true }) //Avoid conflict with name in schema
@ObjectType()
@Entity()
export class Restaurant extends CoreEntity {
  @Field(type => String)
  @Column()
  @IsString()
  @Length(5)
  name: string;

  @Field(type => String)
  @Column()
  @IsString()
  coverImage: string;

  @Field(type => String, { defaultValue: '' })
  @Column()
  @IsString()
  address: string;

  @Field(type => Category, { nullable: true })
  @ManyToOne(
    type => Category,
    category => category.restaurants,
    { nullable: true, onDelete: "SET NULL", eager: true }
  )
  category: Category

  @Field(type => User)
  @ManyToOne(
    type => User,
    user => user.restaurants,
    { onDelete: "CASCADE" }
  )
  owner: User;

  @RelationId((restaurant: Restaurant) => restaurant.owner)
  ownerId: number;

  @Field(type => [Dish], { nullable: true })
  @OneToMany(
    type => Dish,
    dish => dish.restaurant,
  )
  menu: Dish[];

  @Field(type => Boolean)
  @Column({ default: false })
  isPromoted: boolean;

  @Field(type => Date, { nullable: true })
  @Column({ nullable: true })
  promotedUntil: Date;
}