import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@features/auth/jwt-auth.guard';
import { UserService } from '@features/user/user.service';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AutoMapper, InjectMapper, mapFrom } from 'nestjsx-automapper';
import { HttpErrorException } from '../../exceptions';
import { ErrorCodes } from '../../contanst';
import { UserProfileDto } from '@features/user/dto';
import { UserEntity } from '@features/user/user.entity';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private _userService: UserService, @InjectMapper() private readonly _mapper: AutoMapper) {}

  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Get my profile successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Get('me')
  @UseGuards(JwtAuthGuard)
  async me(@Request() req) {
    const user = await this._userService.findById(req.user.id);
    if (user) {
      return this._mapper.map(user, UserProfileDto, UserEntity);
    }
    throw new HttpErrorException(ErrorCodes.AccountNotExist);
  }
}
