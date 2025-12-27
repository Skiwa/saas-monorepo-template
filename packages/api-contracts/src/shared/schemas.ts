import { z } from 'zod';

export const StringSchema = z.string().trim();
export const UUIDSchema = z.uuid();
