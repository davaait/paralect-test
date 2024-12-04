import { z } from 'zod';

import { validateMiddleware } from 'middlewares';

import { AppKoaContext, AppRouter } from 'types';

import vacancyService from '../vacancy.service';

const schema = z.object({
  company: z.string().min(1, 'Company name is required').max(30),
  position: z.string().min(1, 'Position is required').max(30),
  salaryRange: z.string().optional(),
  status: z.string(),
  note: z.string().optional(),
});

type ValidatedData = z.infer<typeof schema>;

async function handler(ctx: AppKoaContext<ValidatedData>) {
  const { company, position, salaryRange, status, note } = ctx.validatedData;

  ctx.body = await vacancyService.insertOne({
    company,
    position,
    salaryRange,
    status,
    note,
  });
}

export default (router: AppRouter) => {
  router.post('/', validateMiddleware(schema), handler);
};
