import { z } from 'zod';
import { messages } from '@/config/messages';

export const productFormSchema = z.object({
  name: z.string().min(1, { message: messages.productNameIsRequired }),
  sku: z.string().optional(),
  productType: z
    .string({ required_error: messages.productTypeIsRequired })
    .min(1, { message: messages.productTypeIsRequired }),
  category: z.string().optional(),
  description: z.string().optional(),
  costPrice: z.coerce.number().optional(),
  salePrice: z.coerce
    .number()
    .min(0, { message: messages.salePriceIsRequired })
});

export type CreateProductInput = z.infer<typeof productFormSchema>;
