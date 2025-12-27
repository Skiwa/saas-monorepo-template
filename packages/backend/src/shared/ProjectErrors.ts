import { Data } from 'effect';
import { ZodIssue } from 'zod';

export class ValidationError extends Data.TaggedError('ValidationError')<{
  message: string;
  issues: ZodIssue[];
}> {}
export class NotFoundError extends Data.TaggedError('NotFoundError')<object> {}
export class DuplicateError extends Data.TaggedError('DuplicateError')<object> {}
export class ForbiddenError extends Data.TaggedError('ForbiddenError')<object> {}
