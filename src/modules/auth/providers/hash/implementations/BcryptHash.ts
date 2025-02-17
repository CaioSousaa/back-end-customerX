import { Injectable } from '@nestjs/common';
import { IHashPasswordContract } from '../contract/IHash';
import { compare, hash } from 'bcrypt';

@Injectable()
export class BcryptHashPassword implements IHashPasswordContract {
  compareHash(payload: string, hashed: string): Promise<boolean> {
    return compare(payload, hashed);
  }
  generateHash(payload: string): Promise<string> {
    return hash(payload, 8);
  }
}
