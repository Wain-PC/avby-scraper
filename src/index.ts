import { config } from './utils/config.js';

import mongoose from 'mongoose';
import { CronJob } from 'cron';
import { processCycle } from './controllers/index.js';

console.debug('Config:', config);

await mongoose.connect(config.mongoURL);
console.debug('MongoDB Connected, starting Cron');
new CronJob(config.cron, processCycle, null, true, undefined, undefined, true);
