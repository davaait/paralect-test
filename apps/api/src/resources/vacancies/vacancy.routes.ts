import { routeUtil } from 'utils';

import create from './actions/create';
import list from './actions/list';
import remove from './actions/remove';
import update from './actions/update';

const publicRoutes = routeUtil.getRoutes([list, update, create, remove]);

export default {
  publicRoutes,
};
