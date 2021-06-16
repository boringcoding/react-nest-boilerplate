import {
  BadRequestException,
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { v4 as uuid } from 'uuid';
import * as bcrypt from 'bcrypt';
import { RegistrationDto } from './dto/registration.dto';
import { MailService } from '../mail/mail.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly mailService: MailService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async hashPassword(password) {
    return bcrypt.hash(password, 5);
  }

  validateAccessToken(token) {
    try {
      return this.jwtService.verify(token, {
        secret: this.configService.get('JWT_ACCESS_SECRET'),
      });
    } catch (err) {
      return null;
    }
  }

  validateRefreshToken(token) {
    try {
      return this.jwtService.verify(token, {
        secret: this.configService.get('JWT_REFRESH_SECRET'),
      });
    } catch (err) {
      return null;
    }
  }

  async registration({ email, password }: RegistrationDto) {
    const candidate = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });

    if (candidate) {
      throw new HttpException('User with given email already exist', 500);
    }

    const hashedPassword = await this.hashPassword(password);

    const activationHash = uuid();
    const activationLink = `${this.configService.get(
      'SITE_URL',
    )}/auth/activate/${activationHash}`;

    const user = await this.prismaService.user.create({
      data: {
        email,
        password: hashedPassword,
        activationLink: activationHash,
      },
    });

    const mailResult = await this.mailService.sendActivationMail(
      user,
      activationLink,
    );
    const payload = { username: user.name, sub: user.id };

    const tokens = this.generateTokens(payload);
    await this.saveToken(user.id, tokens.refresh_token);
    return tokens;
  }

  async login({ email, password }: RegistrationDto) {
    const user = await this.prismaService.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new BadRequestException('Email or password is wrong');
    }

    const passwordsMatch = await bcrypt.compare(password, user.password);

    if (!passwordsMatch) {
      throw new BadRequestException('Email or password is wrong');
    }

    const payload = { username: user.name, sub: user.id };
    const tokens = this.generateTokens(payload);

    await this.saveToken(user.id, tokens.refresh_token);

    return tokens;
  }

  async refreshToken(refreshToken: string) {
    if (!refreshToken) {
      throw new UnauthorizedException();
    }
    const userData = this.validateRefreshToken(refreshToken);

    if (!userData) {
      throw new UnauthorizedException();
    }

    const token = await this.prismaService.token.findFirst({
      where: {
        refreshToken,
      },
    });

    if (!token) {
      throw new UnauthorizedException();
    }

    const user = await this.prismaService.user.findUnique({
      where: {
        id: userData.sub,
      },
    });

    const payload = { username: user.name, sub: user.id };
    const tokens = this.generateTokens(payload);
    await this.saveToken(user.id, tokens.refresh_token);

    return tokens;
  }

  async logout(refreshToken: string) {
    const token = await this.prismaService.token.findFirst({
      where: {
        refreshToken,
      },
    });
    if (!token) {
      return null;
    } else {
      return this.prismaService.token.delete({
        where: {
          id: token.id,
        },
      });
    }
  }

  async activate(activationHash: string) {
    const user = await this.prismaService.user.findFirst({
      where: {
        activationLink: activationHash,
      },
    });

    if (!user) {
      throw new BadRequestException('Wrong activation link has been provided');
    }

    // todo make it better
    if (user.isActivated) {
      return 'already activated';
    } else {
      await this.prismaService.user.update({
        where: {
          id: user.id,
        },
        data: {
          isActivated: true,
        },
      });

      return 'your account is activated now';
    }
  }

  async getUsers() {
    return this.prismaService.user.findMany();
  }

  generateTokens(payload: any) {
    return {
      access_token: this.jwtService.sign(payload, {
        secret: this.configService.get('JWT_ACCESS_SECRET'),
        expiresIn: this.configService.get('JWT_ACCESS_EXPIRES_IN'),
      }),
      refresh_token: this.jwtService.sign(payload, {
        secret: this.configService.get('JWT_REFRESH_SECRET'),
        expiresIn: this.configService.get('JWT_REFRESH_EXPIRES_IN'),
      }),
    };
  }

  async saveToken(userId, refreshToken) {
    const token = await this.prismaService.token.findFirst({
      where: {
        userId,
      },
    });

    if (token) {
      await this.prismaService.token.update({
        where: {
          id: token.id,
        },
        data: {
          refreshToken,
        },
      });
    } else {
      await this.prismaService.token.create({
        data: {
          userId,
          refreshToken,
        },
      });
    }
  }
}
