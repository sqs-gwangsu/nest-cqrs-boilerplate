import { env } from '@/common/config/env'
import { JwtSignOptions } from '@nestjs/jwt/dist/interfaces/jwt-module-options.interface'

export class JwtSignOption {
  public static get(subject: string, expiresIn: string): JwtSignOptions {
    return {
      ...this.default(),
      subject,
      expiresIn,
    }
  }

  private static default(): JwtSignOptions {
    return {
      algorithm: 'HS256',
      secret: env.token.secret,
      issuer: env.token.issuer,
      audience: env.token.audience.split(','),
      mutatePayload: false,
      noTimestamp: false,
      header: {
        alg: 'HS256',
      },
      allowInsecureKeySizes: false,
      allowInvalidAsymmetricKeyTypes: false,
    }
  }
}
