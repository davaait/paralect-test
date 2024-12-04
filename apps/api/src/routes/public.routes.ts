import mount from 'koa-mount';

import { AppKoa, AppRouter } from 'types';

import { vacancyRoutes } from '../resources/vacancies';

const healthCheckRouter = new AppRouter();
healthCheckRouter.get('/health', (ctx) => {
  ctx.status = 200;
});

export default (app: AppKoa) => {
  app.use(healthCheckRouter.routes());
  app.use(mount('/vacancy', vacancyRoutes.publicRoutes));
};
