import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { User } from '@/modules/user/entities';
import { Request } from 'express';
import { ApiResponseCodeEnum } from '@/helper/enums';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'userName',
      passwordField: 'password',
      session: true,
      passReqToCallback: true
    });
  }

  async validate(req: Request, userName: string, password: string): Promise<User> {
    console.log('req ----->', req.body)
    console.log('req ----->', req.session)
    console.log('userName ----->', userName);
    console.log('password ----->', password);
    const user = await this.authService.validateUser(userName, password)
    if (!user) throw new UnauthorizedException({ code: ApiResponseCodeEnum.UNAUTHORIZED, msg: '账号或密码错误' })

    return user
  }
}
