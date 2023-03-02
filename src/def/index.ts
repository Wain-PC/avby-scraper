import { EModuleIds, TScrapedItem } from './module.js';

export type TRequestName = string;

export type TRequestFile = {
  moduleId: EModuleIds | undefined;
  name: TRequestName;
  request: any | undefined;
};

export type TDatabaseItem = {
  id: EModuleIds;
  name: TRequestName;
  items: TScrapedItem[];
};
