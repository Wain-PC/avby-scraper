import { config } from './utils/config.js';
// @ts-ignore
import req from '../http/request.json' assert { type: 'json' };

import mongoose from 'mongoose';

await mongoose.connect(config.mongoURL);

console.log('connected');
