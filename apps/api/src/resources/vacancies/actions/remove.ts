import { AppKoaContext, AppRouter, Next } from 'types';

import vacancyService from '../vacancy.service';

type ValidatedData = never;
type Request = {
  params: {
    id: string;
  };
};

async function validator(ctx: AppKoaContext<ValidatedData, Request>, next: Next) {
  const isUserExists = await vacancyService.exists({ _id: ctx.request.params.id });

  ctx.assertError(isUserExists, 'Vacancy not found');

  await next();
}

async function handler(ctx: AppKoaContext<ValidatedData, Request>) {
  await vacancyService.deleteOne({ _id: ctx.request.params.id });
  logger.info(ctx.request.params);

  ctx.status = 204;
}

export default (router: AppRouter) => {
  router.delete('/:id', validator, handler);
};
