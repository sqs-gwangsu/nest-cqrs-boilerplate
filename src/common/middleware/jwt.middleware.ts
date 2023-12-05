import { Inject, Injectable, Logger, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  @Inject()
  private readonly logger: Logger;

  @Inject()
  private readonly jwtService: JwtService;

  async use(request: Request, response: Response, next: NextFunction) {
    const payload = await this.getTokenPayload(request);

    if (payload) {
      request.jwtPayload = payload;
    }

    this.logger.debug({ jwt: request.jwtPayload || null });

    next();
  }

  extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(" ") ?? [];
    return type === "Bearer" ? token : undefined;
  }

  private async getTokenPayload(request: Request): Promise<any> {
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      return null;
    }

    try {
      const payload = await this.jwtService.verifyAsync(token);
      return payload;
    } catch (e) {
      return null;
    }
  }
}
