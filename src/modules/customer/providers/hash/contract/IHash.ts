export interface IHash {
  generatedHash(payload: string): Promise<string>;
}
