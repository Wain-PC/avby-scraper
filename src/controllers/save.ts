import { Request } from '../models/index.js';
import { TRequestName, TRequestResult } from '../def/index.js';

export const loadRequestFromDB = async (
  name: TRequestName,
): Promise<TRequestResult | null> => {
  return Request.findOne({ name });
};
export const saveRequestToDB = async (req: TRequestResult): Promise<void> => {
  await Request.replaceOne({ name: req.name }, req, { upsert: true });
};
