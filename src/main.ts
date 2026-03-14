import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 1. Set the Prefix
  app.setGlobalPrefix('api/v1');

  // 2. Setup DTO Validation
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, 
    forbidNonWhitelisted: false, 
    transform: true, 
  }));

  // 3. Enable CORS for your Next.js frontend
  app.enableCors();

  // 4. Start the server (ONLY ONCE, AT THE VERY END)
  await app.listen(3001);
  console.log('🚀 Server running on http://localhost:3001/api/v1');
}
bootstrap();