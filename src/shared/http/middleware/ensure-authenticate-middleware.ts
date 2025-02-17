import { NextFunction, Request, Response } from 'express';
import { secret } from '../../../external/config/jwt/config.jwt';
import { verify } from 'jsonwebtoken';
import {
  HttpException,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';

interface ITokenPayload {
  iat: number;
  exp: number;
  id: string;
  fullname: string;
  email: string;
}

export function EnsureAuthenticateMidllwware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new UnauthorizedException('JWT token is missing');
  }

  const [, token] = authHeader.split(' ');
  try {
    if (!secret) {
      throw new UnauthorizedException('JWT secret is not defined');
    }

    const decoded = verify(token, secret);

    const { id, email, fullname } = decoded as ITokenPayload;

    req.customer = { id, email, fullname };

    return next();
  } catch {
    throw new HttpException('Invalid JWT Token', HttpStatus.UNAUTHORIZED);
  }
}
