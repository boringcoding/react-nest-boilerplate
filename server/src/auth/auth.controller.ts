import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { RegistrationDto } from './dto/registration.dto';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Post('registration')
  async registration(
    @Body() registrationDto: RegistrationDto,
    @Res() response: Response,
  ) {
    const data = await this.authService.registration(registrationDto);
    response.cookie('refreshToken', data.refresh_token, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      // secure: true, // prod
    });
    return response.send(data);
  }

  @Post('login')
  async login(
    @Body() registrationDto: RegistrationDto,
    @Res() response: Response,
  ) {
    const data = await this.authService.login(registrationDto);
    response.cookie('refreshToken', data.refresh_token, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      // secure: true, // prod
    });
    return response.send(data);
  }

  @Post('logout')
  async logout(@Req() request: Request, @Res() response: Response) {
    const { refreshToken } = request.cookies;
    if (!refreshToken) {
      return response.send(null);
    }

    response.clearCookie('refreshToken');
    await this.authService.logout(refreshToken);
    return response.send(null);
  }

  @Get('activate/:activationHash')
  async activate(
    @Param('activationHash') activationHash: string,
    @Res() response: Response,
  ) {
    await this.authService.activate(activationHash);
    return response.redirect(this.configService.get('CLIENT_URL'));
  }

  @Get('refresh')
  async refreshToken(@Req() request: Request, @Res() response: Response) {
    const { refreshToken } = request.cookies;
    if (!refreshToken) {
      return null;
    }

    const data = await this.authService.refreshToken(refreshToken);

    response.cookie('refreshToken', data.refresh_token, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      // secure: true, // prod
    });

    return response.send(data);
  }

  @Get('users')
  @UseGuards(JwtAuthGuard)
  getUsers() {
    return this.authService.getUsers();
  }
}
