import { config } from './utils/config.js';

import mongoose from 'mongoose';
import { getAllRequests } from './utils/requests.js';
import { getAllAdverts } from './controllers/list.js';
import { TRequestResult } from './def/index.js';
import { loadRequestFromDB, saveRequestToDB } from './controllers/save.js';
import { differenceBy } from 'lodash-es';

await mongoose.connect(config.mongoURL);

console.log('connected');

const allRequests = await getAllRequests();
console.log('allRequests', allRequests);

for (const { listRequest, name } of allRequests) {
  const adverts = await getAllAdverts(listRequest);
  const requestFromSite: TRequestResult = {
    name,
    adverts,
  };

  const requestFromDB = await loadRequestFromDB(name);

  if (requestFromDB !== null) {
    const soldItems = differenceBy(
      requestFromDB.adverts,
      requestFromSite.adverts,
      'id',
    );

    const addedItems = differenceBy(
      requestFromSite.adverts,
      requestFromDB.adverts,
      'id',
    );
    console.log('allAdverts: ', adverts.length, soldItems, addedItems);
  }

  // TODO: Send sold & added to telegram

  await saveRequestToDB(requestFromSite);
  console.log('saved successfully');
}
