import { z } from 'zod';

import { validateMiddleware } from 'middlewares';

import { AppKoaContext, AppRouter, Next } from 'types';

import vacancyService from '../vacancy.service';

const schema = z.object({
  company: z.string().min(1, 'Company name is required').max(30),
  position: z.string().min(1, 'Position is required').max(30),
  salaryRange: z.string().optional(),
  status: z.string(),
  note: z.string().optional(),
});

type ValidatedData = z.infer<typeof schema>;
type Request = {
  params: {
    id: string;
  };
};

async function validator(ctx: AppKoaContext<ValidatedData, Request>, next: Next) {
  const isVacancyExist = await vacancyService.exists({ _id: ctx.request.params.id });

  ctx.assertError(isVacancyExist, 'Vacancy not found');

  await next();
}

async function handler(ctx: AppKoaContext<ValidatedData, Request>) {
  const { company, position, salaryRange, status, note } = ctx.validatedData;

  const updatedVacancy = await vacancyService.updateOne({ _id: ctx.request.params?.id }, () => ({
    company,
    position,
    salaryRange,
    status,
    note,
  }));

  ctx.body = vacancyService.getPublic(updatedVacancy);
}

export default (router: AppRouter) => {
  router.put('/:id', validator, validateMiddleware(schema), handler);
};
