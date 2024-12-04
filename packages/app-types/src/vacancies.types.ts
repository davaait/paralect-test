import { z } from 'zod';

import { feedbackSchema, feedbackUpdateSchema } from 'schemas';

export type Feedback = z.infer<typeof feedbackSchema>;

export type UpdateVacancyParams = z.infer<typeof feedbackUpdateSchema>;
