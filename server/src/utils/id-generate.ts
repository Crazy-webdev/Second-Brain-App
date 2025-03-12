import { typeid } from 'typeid-js';

export function generateId(prefix: string): string {
  return prefix ? typeid(prefix).toString() : typeid().toString();
}