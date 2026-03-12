import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // --- STEP 10: ENABLE DTO VALIDATION ---
  // This tells NestJS to automatically check all incoming POST requests 
  // against the rules we wrote in create-profile.dto.ts.
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Automatically strips out any extra fields not defined in the DTO
    forbidNonWhitelisted: true, // Throws an error if they send fields that shouldn't be there
    transform: true, // Automatically transforms payloads to match expected types
  }));

  // Enable CORS so your Next.js frontend can actually talk to this backend
  app.enableCors();

  await app.listen(3001);
}
bootstrap();