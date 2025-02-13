import { Injectable } from '@nestjs/common';
import { IHash } from '../contract/IHash';
import { hash } from 'bcrypt';

@Injectable()
export class BcryptHash implements IHash {
  generatedHash(payload: string): Promise<string> {
    return hash(payload, 8);
  }
}
