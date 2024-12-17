import type { H3Error } from 'h3';

export interface KGError extends H3Error {
  stack: string | undefined;
}
