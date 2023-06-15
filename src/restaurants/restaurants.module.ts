import { CategoryRepository } from './repositories/category.repository'
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { 
  CategoryResolver, 
  DishResolver, 
  RestaurantResolver } from './restaurants.resolver';
import { Restaurant } from './entities/restaurant.entity';
import { RestaurantService } from './restaurants.service';
import { Category } from './entities/category.entity';
import { Dish } from './entities/dish.entity';

@Module({
  // imports: [TypeOrmModule.forFeature([Restaurant,Category])],
  imports: [TypeOrmModule.forFeature([Restaurant,CategoryRepository,Dish])],
  providers: [
    RestaurantResolver,
    CategoryResolver,
    DishResolver,
    RestaurantService
  ],
  exports: [TypeOrmModule]
})
export class RestaurantsModule {}
