import { DynamicModule, Global, Module } from '@nestjs/common';
import { JwtModuleOptions } from './jwt.interfaces';
import { CONFIG_OPTIONS } from '../common/common.constants';
import { JwtService } from './jwt.service';
import { UsersModule } from '../users/users.module';

@Module({})
@Global()
export class JwtModule {
  static forRoot(options: JwtModuleOptions): DynamicModule{
    return {
      module: JwtModule,
      imports: [UsersModule],
      // providers: [JwtService],
      // providers: [{
      //   provide:JwtService,
      //   useClass:JwtService
      // }],
      providers:[
        {
          provide: CONFIG_OPTIONS,
          useValue: options
        },
        JwtService
      ],
      exports: [JwtService],
    }
  }
}
