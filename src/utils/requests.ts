import path from 'path';
import { config } from './config.js';
import { readdir, readFile } from 'fs/promises';
import { ListRequest } from '../def/index.js';

export async function getAllRequests(): Promise<ListRequest[]> {
  const dir = path.resolve(config.requestsDir);
  const files = await readdir(dir);
  const res: ListRequest[] = [];

  for (const file of files) {
    const content = await readFile(path.resolve(dir, file), {
      encoding: 'utf8',
    });
    res.push(JSON.parse(content));
  }

  return res;
}
