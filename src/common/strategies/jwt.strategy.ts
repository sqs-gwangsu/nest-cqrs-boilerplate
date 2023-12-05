import { Injectable } from "@nestjs/common";
import { JwtSignResult, Payload } from "@/common/type/jwt.type";
import { env } from "@/common/config/env";
import { JwtService } from "@nestjs/jwt";
import { JwtSignOption } from "@/common/constants/jwt-sign-option.constants";
import { JwtVerifyOption } from "@/common/constants/jwt-verify-option.constants";

@Injectable()
export class JwtStrategy {
  constructor(private readonly jwtService: JwtService) {}

  async sign<T extends Record<string, any>>(payload: T, account: string): Promise<JwtSignResult> {
    const accessOpt = JwtSignOption.get(account, env.token.expiredIn.access);
    const refreshOpt = JwtSignOption.get(account, env.token.expiredIn.refresh);

    const accessToken = await this.jwtService.signAsync(
      {
        ...payload,
        type: "access",
      },
      accessOpt,
    );

    const refreshToken = await this.jwtService.signAsync(
      {
        ...payload,
        type: "refresh",
      },
      refreshOpt,
    );

    return {
      accessToken,
      refreshToken,
    };
  }

  async verify<T>(token: string): Promise<(T & Payload) | null> {
    try {
      const decoded = await this.jwtService.verifyAsync(token, JwtVerifyOption.get());
      return decoded.payload;
    } catch (e) {
      return null;
      //throw QvUnauthorizedException.create()
    }
  }
}
