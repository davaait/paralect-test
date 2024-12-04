import { AppKoaContext, AppRouter } from 'types';

import vacancyService from '../vacancy.service';

async function handler(ctx: AppKoaContext) {
  ctx.body = {
    vacancies: await vacancyService.find({}),
  };
}

export default (router: AppRouter) => {
  router.get('/', handler);
};
