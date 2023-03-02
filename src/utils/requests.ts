import path from 'path';
import { config } from './config.js';
import { readdir, readFile } from 'fs/promises';
import { TRequestFile } from '../def/index.js';

export async function getAllRequests(): Promise<TRequestFile[]> {
  const dir = path.resolve(config.requestsDir);
  const files = await readdir(dir);
  const res: TRequestFile[] = [];

  for (const name of files) {
    const content = await readFile(path.resolve(dir, name), {
      encoding: 'utf8',
    });

    const obj = JSON.parse(content);

    res.push({
      name,
      moduleId: obj.module,
      request: obj.request,
    });
  }

  return res;
}
