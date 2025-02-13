import { z } from 'zod';
import { messages } from '@/config/messages';
import { fileSchema } from './common-rules';

// form zod validation schema
export const productCategoryFormSchema = z.object({
  name: z.string().min(1, { message: messages.catNameIsRequired }),
  description: z.string().optional()
});

// generate form types from zod validation schema
export type ProductCategoryFormInput = z.infer<typeof productCategoryFormSchema>;
