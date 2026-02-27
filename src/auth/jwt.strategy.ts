// src/auth/jwt.strategy.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') { // <--- Added 'jwt' here
  constructor() {
    super({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  ignoreExpiration: false,
  // The '!' tells TypeScript: "I guarantee this is not undefined"
  secretOrKey: process.env.SUPABASE_JWT_SECRET!, 
});
  }

  async validate(payload: any) {
    // If the token is valid, Passport attaches this return value to req.user
    return { id: payload.sub, email: payload.email };
  }
}