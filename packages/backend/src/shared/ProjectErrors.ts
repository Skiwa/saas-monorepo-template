import { Data } from 'effect';
import { ZodIssue } from 'zod';

type ErrorProps = {
  message?: string;
};

type ValidationErrorProps = ErrorProps & {
  issues: ZodIssue[];
};

export class ValidationError extends Data.TaggedError('ValidationError')<ValidationErrorProps> {}
export class NotFoundError extends Data.TaggedError('NotFoundError')<ErrorProps> {}
export class DuplicateError extends Data.TaggedError('DuplicateError')<ErrorProps> {}
export class ForbiddenError extends Data.TaggedError('ForbiddenError')<ErrorProps> {}
