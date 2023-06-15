import { Repository } from "typeorm";
import { UserRole } from "../../users/entities/user.entity";
import { User } from '../../users/entities/user.entity';
import { Category } from '../../restaurants/entities/category.entity';
import { Restaurant } from '../../restaurants/entities/restaurant.entity';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;
type TUser = Pick<User, 'email' | 'password' | 'role'>;
type TCategory = Pick<Category, 'name' | 'coverImage' | 'slug'>;
type TRestaurant = Pick<Restaurant, 'name' | 'coverImage' | 'address' | 'isPromoted'>;
type IRestaurant = TRestaurant & { categoryName: string }

export const SEED_USERS: TUser[] = [
  {
    email: 'test@test.test',
    password: 'test',
    role: UserRole.Owner,
  },
  {
    email: 'owner@test.test',
    password: 'test',
    role: UserRole.Owner,
  },
  {
    email: 'test2@test.test',
    password: 'test',
    role: UserRole.Owner,
  },
  {
    email: 'test2@test.test',
    password: 'test',
    role: UserRole.Delivery,
  },
]

export const SEED_CATEGORIES: TCategory[] = [
  {
    name:'pollo',
    coverImage:'https://cdn-icons-png.flaticon.com/256/1277/1277768.png',
    slug:'pollo'
  },
  {
    name:'saludable',
    coverImage:'https://cdn-icons-png.flaticon.com/256/4080/4080032.png',
    slug:'saludable'
  },
  {
    name:'pizza',
    coverImage:'https://cdn-icons-png.flaticon.com/256/3703/3703377.png',
    slug:'pizza'
  },
]

export const SEED_RESTAURANTS: IRestaurant[] = [
  {
    name:'Pollo tip top',
    coverImage:'https://bucketnestjsnubereats123.s3.amazonaws.com/1685036386870PolloTipTop.jpeg',
    address:'Bello Horizonte',
    isPromoted: false,
    categoryName: 'pollo',
  },
  {
    name:'Pizza Hut',
    coverImage:'https://bucketnestjsnubereats123.s3.amazonaws.com/1685037190124pizza-hut.jpeg',
    address:'Bello Horizonte',
    isPromoted: false,
    categoryName: 'pizza',
  },
  {
    name:'Go Green',
    coverImage:'https://bucketnestjsnubereats123.s3.amazonaws.com/1685037558045gogreen.jpeg',
    address:'Metrocentro',
    isPromoted: false,
    categoryName: 'saludable',
  },
  {
    name:'Pizza Valentis',
    coverImage:'https://bucketnestjsnubereats123.s3.amazonaws.com/1686598314899PizzaValentis.jpeg',
    address:'Multicentro',
    isPromoted: false,
    categoryName: 'pizza',
  },
]