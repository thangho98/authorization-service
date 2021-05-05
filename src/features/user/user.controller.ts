import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@features/auth/jwt-auth.guard';
import { UserService } from '@features/user/user.service';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private _userService: UserService) {}

  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Get my profile successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Get('me')
  @UseGuards(JwtAuthGuard)
  async me(@Request() req) {
    return this._userService.findById(req.user.id);
  }
}
