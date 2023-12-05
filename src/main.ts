import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationError, ValidationPipe } from "@nestjs/common";
import { json, urlencoded } from "express";
import cookieParser from "cookie-parser";
import { ValidationException } from "@/shared/exception/exception/validation.exception";
import { LogService } from "@/shared/logging/provider/log.service";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    abortOnError: true,
    bufferLogs: true,
  });

  // * Validator
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: false,
      },
      whitelist: true,
      validationError: {
        target: false,
        value: false,
      },
      exceptionFactory: (error: ValidationError[]) => {
        throw ValidationException.create(error);
      },
    }),
  );

  // * Set Utils
  app.enableCors({
    origin: true,
    credentials: true,
    methods: ["PUT, POST, GET, DELETE, PATCH, OPTIONS"],
  });
  app.getHttpAdapter().getInstance().disabled("x-powered-by");
  app.use(json({ limit: "50mb" }));
  app.use(urlencoded({ extended: true, limit: "50mb" }));
  app.use(cookieParser());

  // * Logs
  const logger = app.get(LogService);
  app.useLogger(logger);

  await app.listen(3000);
}

bootstrap();
