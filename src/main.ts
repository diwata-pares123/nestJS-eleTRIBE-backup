import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // --- CRITICAL FIX: ADD THE PREFIX ---
  // This makes the backend match your frontend URL: /api/v1/...
  app.setGlobalPrefix('api/v1');

  // --- DTO VALIDATION ---
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, 
    // Careful with this: if your frontend sends 'user_id' in the body 
    // but it's not in your DTO, this will throw an error.
    forbidNonWhitelisted: false, 
    transform: true, 
  }));

  // Enable CORS for your Next.js frontend
  app.enableCors();

  console.log('🚀 Server running on http://localhost:3001/api/v1');
  await app.listen(3001);
}
bootstrap();