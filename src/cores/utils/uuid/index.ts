import { v4 as uuid_v4 } from 'uuid';
export function generateUUID(): string {
  return uuid_v4();
}
