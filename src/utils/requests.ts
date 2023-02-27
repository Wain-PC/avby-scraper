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
    res.push({
      name,
      listRequest: JSON.parse(content),
    });
  }

  return res;
}
