import { InternalServerErrorException } from "@nestjs/common";
import { Field, InputType, ObjectType, registerEnumType } from "@nestjs/graphql";
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany } from "typeorm";
import * as bcrypt from "bcrypt";
import { IsBoolean, IsEmail, IsEnum, IsString } from "class-validator";
import { CoreEntity } from "../../common/entities/core.entity";
import { Restaurant } from "../../restaurants/entities/restaurant.entity";

export enum UserRole {
  Client = "Client",
  Owner = "Owner",
  Delivery = "Delivery"
}

registerEnumType(UserRole, { name: 'UserRole' });

@InputType("UserInputType", { isAbstract: true })
@ObjectType()
@Entity()
export class User extends CoreEntity {
  @Column()
  @Field(type => String)
  @IsEmail()
  email: string;

  @Column({ select: false })
  @Field(type => String)
  @IsString()
  password: string;

  @Column({ type: 'enum', enum: UserRole })
  @Field(type => UserRole)
  @IsEnum(UserRole)
  role: UserRole

  @Column({ default: false })
  @Field(type => Boolean)
  @IsBoolean()
  verified: boolean;

  @Field(type => [Restaurant], { nullable: true })
  @OneToMany(
    type => Restaurant,
    restaurant => restaurant.owner,
    { onDelete: 'CASCADE' }
  )
  restaurants: Restaurant[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    if (this.password) {
      try {
        this.password = await bcrypt.hash(this.password, 10);
      } catch (error) {
        throw new InternalServerErrorException();
      }
    }
  }

  async checkPassword(aPassword: string): Promise<boolean> {
    try {
      return await bcrypt.compare(aPassword, this.password);
    } catch (error) {
      // console.log(error);
      throw new InternalServerErrorException();
    }
  }
}