import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationError, ValidationPipe } from "@nestjs/common";
import { ValidationException } from "@/shared/exception/validation.exception";

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

  await app.listen(3000);
}

bootstrap();
