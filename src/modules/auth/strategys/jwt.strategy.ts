import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';
import dayjs from '@/utils/date.util';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
      issuer: configService.get<string>('JWT_ISSUER'),
    } as StrategyOptions);
  }
  // user 参数为 获取解析token的数据 return 内容 会作为 request 对象的 user属性存在
  async validate(payload: { sub: number; userName: string; iat: number; exp: number; iss: string }) {
    console.log('JWT策略触发 ----->', payload);
    // 通过 用户名和 id 查询数据库 redis 缓存优化
    // token 无感刷新
    // 当前秒

    const nowS = dayjs().unix();
    console.log('token 剩余有效秒: ----->', payload.exp - nowS);
    //
    return 1212;
  }
}
