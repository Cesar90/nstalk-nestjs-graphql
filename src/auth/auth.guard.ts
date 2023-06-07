import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { GqlExecutionContext } from "@nestjs/graphql";
import { Observable } from "rxjs";
import { JwtService } from '../jwt/jwt.service';
import { UsersService } from '../users/users.service';
import { User } from "../users/entities/user.entity";
import { AllowedRoles } from "./role.decorator";

@Injectable()
export class AuthGuard implements CanActivate{
  constructor(
    private readonly reflactor: Reflector,
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
  ){}
  async canActivate(context: ExecutionContext){
    const roles = this.reflactor.get<AllowedRoles>('roles',context.getHandler())
    if(!roles){
      return true
    }
    const gqlContext = GqlExecutionContext.create(context).getContext();
    const token = gqlContext.token;
    if(token){
      const decoded = this.jwtService.verify(token.toString())
      if(typeof decoded === 'object' && decoded.hasOwnProperty('id')){
        const { user } = await this.userService.findById(decoded['id'])
        if(!user){
          return false
        }
        gqlContext['user'] = user

        if(roles.includes("Any")){
          return true
        }
        return roles.includes(user.role)
      } else{
        return false
      }
    } else {
      return false
    }
  }
}