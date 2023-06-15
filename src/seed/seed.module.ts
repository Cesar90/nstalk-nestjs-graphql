import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from '../users/users.module';
import { RestaurantsModule } from '../restaurants/restaurants.module';
import { SeedController } from './seed.controller';
import { SeedService } from './seed.service';

@Module({
  controllers: [SeedController],
  imports: [
    ConfigModule,
    UsersModule,
    RestaurantsModule
  ],
  providers: [SeedService],
})
export class SeedModule {}
