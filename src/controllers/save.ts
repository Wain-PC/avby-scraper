import { Item } from '../models/index.js';
import { EModuleIds, TScraperResponse } from '../def/module.js';
import { TDatabaseItem, TRequestName } from '../def/index.js';

export const loadRequestFromDB = async (
  name: TRequestName,
): Promise<TDatabaseItem | null> => {
  return Item.findOne({ name });
};
export const saveRequestToDB = async (
  id: EModuleIds,
  name: TRequestName,
  res: TScraperResponse,
): Promise<void> => {
  const item: TDatabaseItem = { id, name, items: res.items };

  await Item.replaceOne({ id, name }, item, { upsert: true });
};
