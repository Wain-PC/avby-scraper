import { config } from './utils/config.js';

import mongoose from 'mongoose';
import { CronJob } from 'cron';
import { processCycle } from './controllers/index.js';

const job = new CronJob(
  config.cron,
  processCycle,
  null,
  false,
  undefined,
  undefined,
  true,
);

await mongoose.connect(config.mongoURL);
console.debug('MongoDB Connected');
job.start();
