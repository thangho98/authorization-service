import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@features/auth/jwt-auth.guard';
import { UserService } from '@features/user/user.service';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserCreateInput } from '@features/user/dto/user-create.input';
import { UserDto } from '@features/user/dto/user.dto';
import { UserProfileDto } from '@features/user/dto';
import { JwtPayload } from '@features/auth/jwt-payload';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private _userService: UserService) {}

  @ApiBearerAuth()
  @Get()
  @ApiResponse({ status: 200, description: 'Get list users successfully', type: [UserDto] })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  public async getAll(): Promise<UserDto[]> {
    return this._userService.getAll();
  }

  @ApiBearerAuth()
  @ApiResponse({ status: 201, description: 'create user successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  @UseGuards(JwtAuthGuard)
  public async create(@Body() input: UserCreateInput, @Request() req) {
    return this._userService.create(input, req.user);
  }

  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Get my profile successfully', type: UserProfileDto })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Get('me')
  @UseGuards(JwtAuthGuard)
  async me(@Request() req): Promise<UserProfileDto> {
    const auth: JwtPayload = req.user;
    return this._userService.findById(auth.sub);
  }
}
