import { UseGuards } from "@nestjs/common";
import { Resolver, Query, Mutation, Args, Context } from "@nestjs/graphql";
import { AuthUser } from "src/auth/auth-user.decorator";
import { Role } from "src/auth/role.decorator";
import { AuthGuard } from "../auth/auth.guard";
import { CreateAccountOutput, CreateAccountInput } from "./dtos/create-account.dto";
import { EditProfileInput, EditProfileOutput } from "./dtos/edit-profile.dto";
import { LoginInput, LoginOutput } from "./dtos/login.dto";
import { UserProfileInput, UserProfileOutput } from "./dtos/user-profile.dto";
import { User } from "./entities/user.entity";
import { UsersService } from './users.service';

@Resolver(of => User)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService
  ) {
  }

  @Mutation(returns => CreateAccountOutput)
  async createAccount(
    @Args("input") createAccountInput: CreateAccountInput
  ): Promise<CreateAccountOutput> {
    return await this.usersService.createAccount(createAccountInput);
  }

  @Mutation(retunrs => LoginOutput)
  async login(
    @Args('input') loginInput: LoginInput
  ): Promise<LoginOutput> {
    return this.usersService.login(loginInput);
  }

  @Query(returns => User)
  @Role(['Any'])
  me(
    @AuthUser() authUser: User
  ) {
    return authUser;
  }

  @Role(['Any'])
  @Query(returns => UserProfileOutput)
  async userProfile(
    @Args() userProfileInput: UserProfileInput
  ): Promise<UserProfileOutput> {
    return this.usersService.findById(userProfileInput.userId);
  }

  @Role(['Any'])
  @Mutation(returns => EditProfileOutput)
  async editProfile(
    @AuthUser() authUser: User,
    @Args('input') editProfileInput: EditProfileInput
  ): Promise<EditProfileOutput> {
    return this.usersService.editProfile(authUser.id, editProfileInput);
  }
}