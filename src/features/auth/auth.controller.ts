import { Controller, Post, Req, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from '@features/auth/local-auth.guard';
import { AuthService } from '@features/auth/auth.service';
import JwtRefreshGuard from '@features/auth/Jwt_refresh.guard';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { LoginInput, RefreshTokenInput } from '@features/auth/dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private _authService: AuthService) {}

  @ApiBody({
    description: 'login input',
    type: LoginInput,
  })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this._authService.login(req.user);
  }

  @ApiBody({
    description: 'refresh token input',
    type: RefreshTokenInput,
  })
  @UseGuards(JwtRefreshGuard)
  @Post('refresh-token')
  refresh(@Req() req) {
    return this._authService.refreshToken(req.user);
  }
}
