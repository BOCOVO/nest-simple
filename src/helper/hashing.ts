import { hash } from 'argon2';

export const hashValue = (value: string) => {
  return hash(value);
};
