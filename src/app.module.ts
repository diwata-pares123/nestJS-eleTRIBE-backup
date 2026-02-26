import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule], // This connects your users feature
  controllers: [],        // Left empty because we deleted app.controller.ts
  providers: [],          // Left empty because we deleted app.service.ts
})
export class AppModule {}