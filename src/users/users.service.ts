import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as jwt from "jsonwebtoken"
import { CreateAccountInput, CreateAccountOutput } from "./dtos/create-account.dto";
import { EditProfileInput, EditProfileOutput } from "./dtos/edit-profile.dto";
import { LoginInput } from "./dtos/login.dto";
import { User } from "./entities/user.entity";
import { JwtService } from "../jwt/jwt.service";
import { UserProfileOutput } from "./dtos/user-profile.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly users: Repository<User>,
    // private readonly config: ConfigService,
    private readonly jwtService: JwtService,
  ) {
  }

  async createAccount(
    { email, password, role }: CreateAccountInput
  ): Promise<CreateAccountOutput> {
    try {
      const exists = await this.users.findOne({ email });
      if (exists) {
        return {
          ok: false,
          error: 'There is a user with that email already'
        }
      }
      const user = await this.users.save(this.users.create({ email, password, role }));
      return { ok: true }
    } catch (error) {
      return {
        ok: false,
        error: "Couldn't create account"
      }
    }
  }

  async login({ email, password }: LoginInput): Promise<{ ok: boolean, error?: string, token?: string }> {
    try {
      const user = await this.users.findOne({ email }, { select: ["id", "password"] });
      if (!user) {
        return {
          ok: false,
          error: "User not found"
        }
      }
      const passwordCorrect = await user.checkPassword(password);
      if (!passwordCorrect) {
        return {
          ok: false,
          error: 'Wrong password'
        }
      }
      // const token = jwt.sign({
      //   id:user.id,
      // },this.config.get('PRIVATE_KEY'));
      const token = this.jwtService.sign(user.id);
      return {
        ok: true,
        token
      }
    } catch (error) {
      return {
        ok: false,
        error,
      }
    }
  }

  async findById(id: number): Promise<UserProfileOutput> {
    try {
      const user = await this.users.findOneOrFail({ id });
      return {
        ok: true,
        user,
      };
    } catch (error) {
      return { ok: false, error: 'User Not Found' };
    }
  }

  async editProfile(
    userId: number, { email, password }: EditProfileInput
  ): Promise<EditProfileOutput> {
    try {
      // return this.users.update(userId,{...editProfileInput});
      const user = await this.users.findOne({ id: userId });
      if (password) {
        user.password = password;
      }
      await this.users.save(user);
      return {
        ok: true
      }
    } catch (error) {
      return { ok: false, error: 'Could not update profile' }
    }
  }
}