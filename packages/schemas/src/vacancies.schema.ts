import { z } from 'zod';

export const feedbackSchema = z.object({
  _id: z.string(),
  company: z.string().min(1, 'Company name is required'),
  position: z.string().min(1, 'Position is required'),
  salaryRange: z.string().optional(),
  status: z.string(),
  note: z.string().optional(),
});

export const feedbackUpdateSchema = feedbackSchema.partial();
