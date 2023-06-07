import { join } from 'path';
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import * as Joi from 'joi';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { Restaurant } from './restaurants/entities/restaurant.entity';
import { User } from './users/entities/user.entity';
import { Category } from './restaurants/entities/category.entity';
import { Dish } from './restaurants/entities/dish.entity';
import { UsersModule } from './users/users.module';
import { CommonModule } from './common/common.module';
import { JwtModule } from './jwt/jwt.module';
import { AuthModule } from './auth/auth.module';
import { UploadsModule } from './uploads/uploads.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: process.env.NODE_ENV === 'dev' ? ".env" : ".env.test",
      ignoreEnvFile: process.env.NODE_ENV === 'prod',
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('dev', 'prod').required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.string().required(),
        DB_USERNAME: Joi.string().required(),
        DB_NAME: Joi.string().required(),
        PRIVATE_KEY: Joi.string().required()
      })
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'postgres',
          host: config.get('DB_HOST'),
          port: config.get('DB_PORT'),
          username: config.get('DB_USERNAME'),
          password: config.get('DB_PASSWORD'),
          database: config.get('DB_NAME'),
          entities: [User, Restaurant, Category, Dish],
          synchronize: process.env.NODE_ENV !== 'prod',
        } as TypeOrmModuleOptions;
      },
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      context: ({ req, connection }) => {
        const TOKEN_KEY = 'x-jwt';
        const token = req ? req.headers[TOKEN_KEY] : connection.context[TOKEN_KEY];
        return {
          token
        }
      },
    }),
    RestaurantsModule,
    JwtModule.forRoot({
      privateKey: process.env.PRIVATE_KEY
    }),
    UsersModule,
    AuthModule,
    CommonModule,
    UploadsModule,
  ],
  controllers: [],
  providers: [],
})

export class AppModule {
  constructor() {
    console.log("host",  process.env.DB_HOST );
    console.log("port",  +process.env.DB_PORT );
    console.log("username",  process.env.DB_USERNAME );
    console.log("password",  process.env.DB_PASSWORD );
    console.log("database",  process.env.DB_NAME );
  }
}