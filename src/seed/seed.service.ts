import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Category } from '../restaurants/entities/category.entity';
import { Restaurant } from '../restaurants/entities/restaurant.entity';
import { UsersService } from '../users/users.service';
import { SEED_USERS , SEED_CATEGORIES , SEED_RESTAURANTS} from './data/seed-data';

@Injectable()
export class SeedService {
  private isProd: boolean;
  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly usersServices: UsersService,
    @InjectRepository(Category)
    private readonly categoriesRepository: Repository<Category>,
    @InjectRepository(Restaurant)
    private readonly restaurantsRepository: Repository<Restaurant>,
  ){
    this.isProd = configService.get('NODE_ENV') === 'prod';
  }

  async executeSeed(){
    if(this.isProd){
      throw new UnauthorizedException('We cannot run seed on Prod');
    }

    //Clean the database, delete everything
    await this.deleteDatabase();

    //Create users
    const user = await this.loadUsers();
    const categories = await this.loadCategories();
    const restaurants = await this.loadRestaurants(user, categories);

    return 'SEED EXECUTED';
  }

  async deleteDatabase(){

    await this.restaurantsRepository.createQueryBuilder()
      .delete()
      .where({})
      .execute();

    await this.categoriesRepository.createQueryBuilder()
      .delete()
      .where({})
      .execute();
    
    await this.usersRepository.createQueryBuilder()
      .delete()
      .where({})
      .execute();
  }

  async loadUsers(): Promise<User>{
    const users = [];
    for(const user of SEED_USERS){
      users.push( await this.usersServices.createAccount(user))
    }
    return users[0].user;
  }

  async loadCategories(): Promise<Category[]>{
    const categories = [];
    for(const category of SEED_CATEGORIES){
      categories.push(await this.categoriesRepository.save(category))
    }
    return categories;
  }

  async loadRestaurants(user: User, categories: Category[]): Promise<Restaurant[]>{
    const restaurans = [];
    for(const restaurant of SEED_RESTAURANTS){
      let category = categories.find(category => {
        return category.name === restaurant.categoryName;
      })
      restaurans.push(await this.restaurantsRepository.save({
        ...restaurant,
        owner: {
          id: user.id
        },
        category: {
          id: category.id
        }
      }));
    }
    return restaurans;
  }
}
