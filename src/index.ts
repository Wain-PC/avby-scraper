import { config } from './utils/config.js';

import mongoose from 'mongoose';
import { getAllRequests } from './utils/requests.js';
import { getAllAdverts } from './controllers/list.js';

await mongoose.connect(config.mongoURL);

console.log('connected');

const allRequests = await getAllRequests();
console.log('allRequests', allRequests);

for (const request of allRequests) {
  const adverts = await getAllAdverts(request);
  console.log('allAdverts: ', adverts.length);
}
