import { env } from '@/common/config/env'
import { JwtVerifyOptions } from '@nestjs/jwt/dist/interfaces/jwt-module-options.interface'

export class JwtVerifyOption {
  public static get(subject?: string): JwtVerifyOptions {
    return !subject ? this.default() : { ...this.default(), subject }
  }

  private static default(): JwtVerifyOptions {
    return {
      algorithms: ['HS256'],
      secret: env.token.secret,
      issuer: env.token.issuer,
      audience: env.token.audience.split(','),
      complete: true,
      ignoreExpiration: false,
      ignoreNotBefore: false,
      allowInvalidAsymmetricKeyTypes: false,
    }
  }
}
