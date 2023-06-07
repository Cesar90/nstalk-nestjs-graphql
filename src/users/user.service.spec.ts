import { Test } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";

import { UsersService } from "./users.service";
import { JwtService } from "../jwt/jwt.service";
import { Repository } from "typeorm";

const mockRepository = () => {
  return {
    findOne: jest.fn(),
    save: jest.fn(),
    create: jest.fn(),
    findOneOrFail: jest.fn(),
    delete: jest.fn(),
  }
};

const mockJwtService = () => ({
  sign: jest.fn(() => 'signed-token-baby'),
  verify: jest.fn()
})

const mockMailService = {
  sendVerificationEmail: jest.fn()
}

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe("UserService", () => {
  // it.todo("createAccount");
  // it.todo("login");
  // it.todo("findById");
  // it.todo("editProfile");
  // it.todo("verifyEmail");
  let service: UsersService;
  // let testing: Partial<Record<"hello",number>>;
  // testing.hello => number
  let usersRepository: MockRepository<User>;
  let jwtService: JwtService;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository()
        },
        {
          provide: JwtService,
          useValue: mockJwtService()
        }
      ]
    }).compile();
    service = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
    usersRepository = module.get(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe("createAccount", () => {
    const createAccountArgs = {
      email: 'bs@email.com',
      password: 'bs.password',
      role: 0
    }
    it("should fail if user exits", async () => {
      usersRepository.findOne.mockResolvedValue({
        id: 1,
        email: ''
      })
      const result = await service.createAccount(createAccountArgs)
      expect(result).toMatchObject({
        ok: false,
        error: 'There is a user with that email already'
      })
    })

    it('should create a new user', async () => {
      usersRepository.findOne.mockResolvedValue(undefined)
      usersRepository.create.mockReturnValue(createAccountArgs)
      usersRepository.save.mockResolvedValue(createAccountArgs)
      const result = await service.createAccount(createAccountArgs)
      expect(usersRepository.create).toHaveBeenCalledTimes(1)
      expect(usersRepository.create).toHaveBeenCalledWith(createAccountArgs)
      expect(usersRepository.save).toHaveBeenCalledTimes(1)
      expect(usersRepository.save).toHaveBeenCalledWith(createAccountArgs)
      expect(result).toEqual({ ok: true })
    })

    it('should fail on exception', async () => {
      usersRepository.findOne.mockRejectedValue(new Error())
      const result = await service.createAccount(createAccountArgs)
      expect(result).toEqual({
        ok: false,
        error: "Couldn't create account"
      })
    })
  });
  // it.todo("login");
  // it.todo('login')
  describe('login', () => {
    const loginArgs = {
      email: "bs@email.com",
      password: "bs.password"
    }
    it('should fail if user does not exist', async () => {
      usersRepository.findOne.mockResolvedValue(null)
      const result = await service.login(loginArgs)

      expect(usersRepository.findOne).toHaveBeenCalledTimes(1)
      expect(usersRepository.findOne).toHaveBeenCalledWith(
        expect.any(Object),
        expect.any(Object)
      )
      expect(result).toEqual({
        ok: false,
        error: "User not found"
      })
    })

    it('should fail if the password is wrong', async () => {
      const mockUser = {
        id: 1,
        checkPassword: jest.fn(() => Promise.resolve(false))
      }
      usersRepository.findOne.mockResolvedValue(mockUser)
      const result = await service.login(loginArgs)
      expect(result).toEqual({
        ok: false,
        error: "Wrong password"
      })
    })

    it('should return token if password correct', async () => {
      const mockedUser = {
        id: 1,
        checkPassword: jest.fn(() => Promise.resolve(true))
      }
      usersRepository.findOne.mockResolvedValue(mockedUser)
      const result = await service.login(loginArgs)
      expect(jwtService.sign).toHaveBeenCalledTimes(1)
      expect(jwtService.sign).toHaveBeenCalledWith(expect.any(Number))
      expect(result).toEqual({
        ok: true,
        token: 'signed-token-baby'
      })
    })
  });

  // it.todo('findById')
  describe('findById', () => {
    const findByIdArgs = {
      id: 1
    }
    it('Should find an existing user', async () => {
      usersRepository.findOneOrFail.mockResolvedValue(findByIdArgs)
      const result = await service.findById(1)
      expect(result).toEqual({ ok: true, user: findByIdArgs })
    })

    it('should fail if no user if found', async () => {
      usersRepository.findOneOrFail.mockRejectedValue(new Error())
      const result = await service.findById(1)
      expect(result).toEqual({
        ok: false,
        error: 'User Not Found'
      })
    })
  });

  it.todo("editProfile");
  it.todo("verifyEmail");
});