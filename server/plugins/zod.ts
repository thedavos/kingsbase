import type { ZodTypeAny } from 'zod';
import { z } from 'zod';

declare module 'zod' {
  interface ZodOptional<T> {
    nonfalsy(): ZodEffects<T>;
    haskeys(): ZodEffects<T>;
    isobject(): ZodEffects<T>;
  }

  interface ZodEffects<
    T extends ZodTypeAny,
    Output = T['_output'],
    Input = T['_input'],
  > {
    nonfalsy(): ZodEffects<this, Output, Input>;
    haskeys(): ZodEffects<this, Output, Input>;
    isobject(): ZodEffects<this, Output, Input>;
  }
}

/* eslint-disable  @typescript-eslint/no-explicit-any */
const nonfalsy = {
  check: (schema: any) => schema !== null && schema !== undefined && schema !== '' && Boolean(schema),
  message: 'value cannot be falsy',
  path: ['nonfalsy'],
};

const haskeys = {
  check: (schema: any) => Object.keys(schema || {}).length > 0,
  message: 'object cannot be without keys',
  path: ['haskeys'],
};

const isobject = {
  check: (schema: any) => typeof schema === 'object' && nonfalsy.check(schema),
  message: 'must be an object',
  path: ['isobject'],
};

export default defineNitroPlugin(async () => {
  z.ZodOptional.prototype.nonfalsy = function () {
    return this.refine(nonfalsy.check, { message: nonfalsy.message, path: nonfalsy.path });
  };

  z.ZodOptional.prototype.haskeys = function () {
    return this.refine(haskeys.check, { message: haskeys.message, path: haskeys.path });
  };

  z.ZodOptional.prototype.isobject = function () {
    return this.refine(isobject.check, { message: isobject.message, path: isobject.path });
  };

  z.ZodEffects.prototype.nonfalsy = function () {
    return this.refine(nonfalsy.check, { message: nonfalsy.message, path: nonfalsy.path });
  };

  z.ZodEffects.prototype.haskeys = function () {
    return this.refine(haskeys.check, { message: haskeys.message, path: haskeys.path });
  };

  z.ZodEffects.prototype.isobject = function () {
    return this.refine(isobject.check, { message: isobject.message, path: isobject.path });
  };
});
