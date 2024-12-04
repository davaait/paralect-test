import _ from 'lodash';

import db from 'db';

import { DATABASE_DOCUMENTS } from 'app-constants';
import { feedbackSchema } from 'schemas';
import { Feedback } from 'types';

const service = db.createService<Feedback>(DATABASE_DOCUMENTS.VACANCIES, {
  schemaValidator: (obj) => feedbackSchema.parseAsync(obj),
});

const updateLastRequest = (_id: string) =>
  service.atomic.updateOne(
    { _id },
    {
      $set: {
        lastRequest: new Date(),
      },
    },
  );

const getPublic = (vacancy: Feedback | null) => _.pickBy(vacancy);

export default Object.assign(service, {
  updateLastRequest,
  getPublic,
});
